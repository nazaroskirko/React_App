import { connect } from 'react-redux';
import { compose } from 'redux';
import { actions } from 'react-redux-form';
import lifecycle from 'recompose/lifecycle';
import translates from 'constants/error-translates';
import { createStructuredSelector } from 'reselect';
import api from 'api';

const MODEL = 'passwordReset';

const selector = createStructuredSelector({
  form: state => state.forms[MODEL].$form,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  change: (model, data) => dispatch(actions.change(model, data)),
  submit: (data) => {
    const request = dispatch(api.actions.passwordReset(data.id, data))
      .then(_ => {
        dispatch(api.actions.login({ auth: { email: data.email, password: data.user.password } }))
          .then(_ => history.push('/'));
        actions.reset(MODEL);
      })
      .catch(err => Promise.reject({ commonErrors: translates[err.error] || err.error }));
    dispatch(actions.submit(MODEL, request, { fields: true }));
  },
  reset: () => dispatch(actions.reset(MODEL)),
});

export default compose(
  connect(selector, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { id, email } = this.props.match.params;
      this.props.change(MODEL, { id, email });
    },
  }),
);
