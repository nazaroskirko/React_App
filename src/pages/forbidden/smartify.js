import { withRouter } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch, { history }) => ({
  goBack: () => history.goBack(),
});

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
);
