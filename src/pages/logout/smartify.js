import { compose } from 'redux';
import { connect } from 'react-redux';
import withJob from 'utils/with-job';
import { withRouter } from 'react-router';
import { logout } from 'actions';
import { eraseCookie } from 'utils/manage-cookies';

const mapDispatchToProps = (dispatch, props) => ({
  logout: () => {
    eraseCookie('token');
    dispatch(logout());
    props.history.push('/');
  },
});

const work = ({ logout }) => logout();

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
  withJob({ work }),
);
