import { compose } from 'redux';
import { actions } from 'react-redux-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withJob from 'utils/with-job';
import errorTranslates from 'constants/error-translates';
import api from 'api';
import { withState, withReducer, withHandlers } from 'recompose';

const MODEL = 'call';

// make a call after Twilio device is ready
function makeACall({ callToken, callParams }) {
  window.Twilio.Device.setup(callToken);
  if (process.env['NODE_ENV'] === 'production') {
    const callIntID = setInterval(() => {
      if (window.Twilio.Device.status() === 'ready') {
        window.Twilio.Device.connect({
          From: callParams.from,
          To: callParams.to,
          Record: callParams.record,
        });
        clearInterval(callIntID);
      }
    }, 200);
  }
}

const selector = createStructuredSelector({
  clientNumber: state => state.call.number,
});

const mapDispatchToProps = (dispatch, props) => ({
  setupTwilio: () => {
    window.Twilio.Device.ready(device => props.addToLog('Twilio.Device Ready!'));
    window.Twilio.Device.error(error => props.addToLog('Twilio.Device Error: ' + error.message));
    window.Twilio.Device.connect(conn => {
      props.addToLog('Successfully established call!');
      props.openCallModal(true);
    });
    window.Twilio.Device.disconnect(conn => {
      props.addToLog('Call ended.');
    });
  },
  submit: model => {
    props.clearLog();
    const request = dispatch(api.actions.validateNumber(model))
      .then((data) => {
        if (data.callParams && data.callToken && data.callMeta) {
          props.addToLog('Current number: ' + data.callParams.from);
          props.setCallMeta(data.callMeta);
          dispatch(actions.reset(MODEL + '.notes'));
          makeACall(data);
        }
        if (data.purchase) {
          props.setPurchaseInfo(data);
          props.togglePurchaseModal();
        }
      })
      .catch(err => {
        return Promise.reject({ commonErrors: errorTranslates[err.error] || err.error });
      });
    dispatch(actions.submit(MODEL, request, { fields: true }));
  },
  hangUp: model => {
    props.addToLog('Hanging up...');
    window.Twilio.Device.disconnectAll();
    props.openCallModal(false);
    const currentCall = props.currentUser.calls[0];
    currentCall && dispatch(api.actions.updateCall(currentCall.id, model)).then(_ => dispatch(actions.reset(MODEL + '.notes')));
  },
  purchaseNumber: () => {
    dispatch(api.actions.purchaseNumber({ localNumber: props.purchaseInfo })).then(newNumber => {
      props.togglePurchaseModal();
      // Trying to call
      dispatch(actions.submit(MODEL));
    });
  },
  resetCallForm: () => dispatch(actions.reset(MODEL)),
  changeCallForm: model => dispatch(actions.change(MODEL, model)),
});

const work = ({ setupTwilio }) => setupTwilio();

export default compose(
  withState('callModalOpen', 'openCallModal', false),
  withState('callInfoModalOpen', 'openCallInfoModal', false),
  withState('purchaseModalOpen', 'openPurchaseModal', false),
  withState('callInfo', 'setCallInfo', {}),
  withState('callMeta', 'setCallMeta', {}),
  withState('purchaseInfo', 'setPurchaseInfo', {}),
  withReducer('twilioProcessLog', 'dispatch', (state, action) => {
    switch (action.type) {
      case 'ADD':
        return [
          ...state,
          action.payload,
        ];
      case 'CLEAR':
        return [];
      default:
        return state;
    }
  }, []),
  withHandlers({
    toggleCallModal: ({ openCallModal }) => (e) => openCallModal(current => !current),
    toggleCallInfoModal: ({ openCallInfoModal }) => (e) => openCallInfoModal(current => !current),
    togglePurchaseModal: ({ openPurchaseModal }) => (e) => openPurchaseModal(current => !current),
    addToLog: ({ dispatch }) => (payload) => dispatch({ type: 'ADD', payload }),
    clearLog: ({ dispatch }) => () => dispatch({ type: 'CLEAR' }),
  }),
  connect(selector, mapDispatchToProps),
  withJob({ work })
);
