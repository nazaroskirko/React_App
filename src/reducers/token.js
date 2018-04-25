import { LOGOUT, LOGIN, UPDATE_TOKEN } from 'constants/action-types';

export default function(state = null, action) {
  if (action.type === UPDATE_TOKEN) {
    return action.payload;
  }

  if (action.type === LOGIN) {
    return action.payload;
  }

  if (action.type === LOGOUT) {
    return null;
  }

  return state;
}
