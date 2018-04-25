import { compose } from 'redux';
import { withState, withHandlers, lifecycle } from 'recompose';

export default compose(
  withState('callTimer', 'setCallTimer', 0),
  withState('timerIntervalID', 'setTimerIntervalID', null),
  withHandlers({
    resetCallTimer: ({ setCallTimer }) => () => setCallTimer(0),
    incrementCallTimer: ({ setCallTimer, callTimer }) => () => setCallTimer(callTimer + 1000),
  }),
  lifecycle({
    componentDidMount() {
      const timerIntervalID = setInterval(this.props.incrementCallTimer, 1000);
      this.props.setTimerIntervalID(timerIntervalID);
    },
    componentWillUnmount() {
      clearInterval(this.props.timerIntervalID);
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.callModalOpen === false && nextProps.callModalOpen === true) {
        this.props.resetCallTimer();
      }
    },
  }),
);
