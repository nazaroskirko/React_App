import {
  ADD_CALL_PROCESS_LOG,
  CLEAR_CALL_PROCESS_LOG,
} from 'constants/action-types';

export default function(state = [], action) {
  if (action.type === ADD_CALL_PROCESS_LOG) {
    return [
      ...state,
      action.payload,
    ];
  }
  if (action.type === CLEAR_CALL_PROCESS_LOG) {
    return [];
  }
  return state;
}
