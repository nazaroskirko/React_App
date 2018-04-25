import * as actionTypes from 'constants/action-types';

export const updateToken = payload => ({ type: actionTypes.UPDATE_TOKEN, payload });
export const logout = () => ({ type: actionTypes.LOGOUT });
export const addCallProcessLog = payload => ({ type: actionTypes.ADD_CALL_PROCESS_LOG, payload });
export const clearCallProcessLog = () => ({ type: actionTypes.CLEAR_CALL_PROCESS_LOG });
