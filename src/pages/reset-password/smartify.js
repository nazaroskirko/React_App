import { connect } from 'react-redux';
import connectForm from 'utils/connect-form';
import { compose } from 'redux';
import lifecycle from 'recompose/lifecycle';
import { createStructuredSelector } from 'reselect';
import { actions } from 'react-redux-form';

const MODEL = 'resetPassword';

const selector = createStructuredSelector({
  form: state => state.forms[MODEL].$form,
});

export default compose(
  connectForm({
    form: MODEL,
    action: MODEL,
    after: ({ dispatch }) => dispatch(actions.reset(MODEL)),
  }),
  connect(selector),
  lifecycle({
    componentDidMount() {
      this.props.reset(MODEL);
    },
  }),
);
