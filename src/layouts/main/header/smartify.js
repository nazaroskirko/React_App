import { currentUser } from 'selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

const selector = createStructuredSelector({
  currentUser,
});

export default connect(selector);
