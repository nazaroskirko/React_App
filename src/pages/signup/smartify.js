import connectForm from 'utils/connect-form';
import { compose } from 'redux';
import { actions } from 'react-redux-form';
import api from 'api';

export default compose(
  connectForm({
    form: 'signup',
    action: 'signup',
    after: ({ dispatch }) => dispatch((dispatch, data) => {
      const { email, password } = data().signup.user;
      dispatch(api.actions.login({ auth: { email, password } }));
      dispatch(actions.reset('signup'));
    }),
  })
);
