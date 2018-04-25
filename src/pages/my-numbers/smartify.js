import { compose } from 'redux';
import { withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import errorTranslates from 'constants/error-translates';
import api from 'api';
import { createStructuredSelector } from 'reselect';
import withJob from 'utils/with-job';

const MODEL = 'forwardingNumber';

const selector = createStructuredSelector({
  number: state => state.currentUser.forwardingNumber.number,
});

const mapDispatchToProps = (dispatch, props) => ({
  removeNumber: (id) => () =>
    dispatch(api.actions.removeLocalNumber(id))
      .then(data => props.toggleRemoveNumberModal()),
  submit: model => {
    const request = dispatch(api.actions.updateForwardingNumber(props.currentUser.id, model))
      .then(data => {
        props.toggleForwardingNumberForm();
        dispatch(actions.reset(MODEL + '.commonErrors'));
        dispatch(actions.change(MODEL, { number: props.currentUser.forwardingNumber.number })); // update with sanitized version
      }).catch(err => {
        return Promise.reject({ commonErrors: errorTranslates[err.error] || err.error });
      });
    dispatch(actions.submit(MODEL, request, { fields: true }));
  },
  setNumber: (number) => dispatch(actions.change(MODEL, { number })),
});

const work = ({ setNumber, number }) => setNumber(number);

export default compose(
  withState('removeNumberModalOpen', 'openRemoveNumberModal', false),
  withState('numberToRemove', 'setNumberToRemove', {}),
  withState('forwardingNumberFormOpen', 'openForwardingNumberForm', false),
  withHandlers({
    toggleRemoveNumberModal: ({ openRemoveNumberModal }) => (e) => openRemoveNumberModal(current => !current),
    toggleForwardingNumberForm: ({ openForwardingNumberForm }) => (e) => openForwardingNumberForm(current => !current),
  }),
  connect(selector, mapDispatchToProps),
  withJob({
    work,
  }),
);
