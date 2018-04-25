import connectForm from 'utils/connect-form';
import { compose } from 'redux';
import lifecycle from 'recompose/lifecycle';
import { actions } from 'react-redux-form';

export default compose(
  connectForm({
    form: 'login',
    action: 'login',
    after: ({ dispatch }) => dispatch(actions.reset('login')),
    // eslint-disable-next-line
    errorTransform: err => Promise.reject({ commonErrors: 'Invalid login or password.' }),
  }),
  lifecycle({
    componentDidMount() {
      this.props.reset('login');
    },
  }),
);
