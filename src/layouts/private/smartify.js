import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { logout } from 'actions';
import { withRouter } from 'react-router';
import withJob from 'utils/with-job';
import { token, currentUser } from 'selectors';
import api from 'api';

const selector = createStructuredSelector({
  currentUser,
  token,
});

const mapDispatchToProps = (dispatch, props) => ({
  logout: (e) => {
    e.preventDefault();
    dispatch(logout());
  },
  load: () => dispatch(api.actions.currentUser.get()),
});

const work = props => {
  if (props.token) {
    props.load();
  }
};

export default compose(
  withRouter,
  connect(selector, mapDispatchToProps),
  withJob({ work, shouldWorkAgain: (prev, next) => prev.token !== next.token }),
);
