import jwtDecode from 'jwt-decode';
import { createCookie } from 'utils/manage-cookies';
import {
  makeActionCreator,
  makePostActionCreator,
  makePostIdActionCreator,
  makeIdActionCreator,
  makeIdDeleteActionCreator,
  makeSendFileActionCreator,
  makeReducer,
  makeRawReducer,
} from './helpers';

import {
  logout,
  updateToken,
} from '../actions';

import * as actionTypes from 'constants/action-types';

const endpoint = process.env.ENDPOINT;
const makeAction = makeActionCreator(endpoint, fetch);
const makeIdAction = makeIdActionCreator(endpoint, fetch);
const makePostAction  = makePostActionCreator(endpoint, fetch);
const makeIdPostAction = makePostIdActionCreator(endpoint, fetch);
const makeIdDeleteAction = makeIdDeleteActionCreator(endpoint, fetch);
const makeSendFileAction = makeSendFileActionCreator(endpoint, fetch);

const api = {
  actions: {
    // Users
    login: makePostAction('user_token', { after: saveTokenAndLoadUser }),
    signup: makePostAction('signup'),
    currentUser: makeAction('currentUser', 'current_user', { handleFailed: resetAuth }),
    users: makeAction('users', 'users'),
    oneUser: makeIdAction('oneUser', 'users'),
    passwordReset: makeIdPostAction('password_resets', { method: 'PATCH' }),
    resetPassword: makePostAction('password_resets'),

    // Sales reps
    createSalesRep: makePostAction('sales_reps', { after: reloadUser }),
    removeSalesRep: makeIdPostAction('sales_reps', { method: 'DELETE', after: reloadUser }),

    // Twilio
    twilioToken: makeAction('twilioToken', 'twilio/twilio_token'),
    validateAndFindNumber: makePostAction('twilio/validate_and_find_number'),
    callLogs: makeAction('callLogs', 'twilio/calls'),
    parseNumber: makePostAction('twilio/parse_number'),

    // Calls
    calls: makeAction('calls', 'calls'),
    addCall: makePostAction('calls'),
    updateCall: makeIdPostAction('calls', { method: 'PATCH', after: reloadUser }),

    // Local Numbers
    purchaseNumber: makePostAction('local_numbers', { after: reloadUser }), // addLocalNumber
    removeLocalNumber: makeIdPostAction('local_numbers', { method: 'DELETE', after: reloadUser }),

    // Validate number
    validateNumber: makePostAction('validate_number'),

    // Forwarding Number
    updateForwardingNumber: makeIdPostAction('forwarding_numbers', { method: 'PATCH', after: reloadUser }),
  },
  reducers: {
    users: makeReducer('users'),
    oneUser: makeReducer('oneUser'),
    twilioToken: makeReducer('twilioToken'),
    callLogs: makeReducer('callLogs'),
    calls: makeReducer('calls'),
    currentUser: makeRawReducer('currentUser', {
      reducer: (state = {}, action) => {
        if (action.type === actionTypes.LOGOUT) {
          return null;
        }
        return state;
      },
    }),
  },
};

function saveTokenAndLoadUser({ data, dispatch }) {
  const token = jwtDecode(data.jwt);
  createCookie('token', data.jwt, token.exp);
  return dispatch(updateToken(data.jwt));
}

function resetAuth({ dispatch, error }) {
  return dispatch(logout());
}

function reloadUser({ dispatch, data }) {
  return dispatch(api.actions.currentUser.get());
}

export default api;
