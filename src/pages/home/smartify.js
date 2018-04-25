import connectForm from 'utils/connect-form';
import { compose } from 'redux';
import { actions } from 'react-redux-form';
import { connect } from 'react-redux';
import api from 'api';

const MODEL = 'salesRep';

const mapDispatchToProps = (dispatch, props) => ({
  removeSalesRep: id => () => {
    dispatch(api.actions.removeSalesRep(id));
  },
});

export default compose(
  connectForm({
    form: MODEL,
    action: 'createSalesRep',
    after: ({ dispatch }) => dispatch(actions.reset(MODEL)),
  }),
  connect(null, mapDispatchToProps),
);
