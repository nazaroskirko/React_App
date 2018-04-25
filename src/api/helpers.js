import queryString from 'query-string';
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';

const DEFAULT_STATE = {
  count: 0,
  status: 'pending',
  contentRange: '',
  results: [],
};

const SUCCESS_TYPE = 'API_SUCCESS';
const REQUEST_TYPE = 'API_REQUEST';
const RESET_TYPE = 'API_RESET';
const SET_CONTENT_RANGE = 'SET_CONTENT_RANGE';

function toJSON(response) {
  return response.json();
}

function withAuthHeader(token, headers) {
  if (token) {
    return {
      'Authorization': 'Bearer ' + token,
      ...headers,
    };
  }

  return headers;
};

function checkResponse(response) {
  if (response.status >= 400) {
    return response.json().then(data => {
      throw data;
    });
  }

  return response;
}

function makeSuccessAction(key, dispatch, config) {
  dispatch({ type: REQUEST_TYPE, key, ...config });
  return (data) => {
    const normalizedData = camelizeKeys(data);
    dispatch({ type: SUCCESS_TYPE, key, data: normalizedData, ...config });
    return normalizedData;
  };
}

function uniq(a, b) {
  const ids = [];
  const result = [];

  function fill(i) {
    if (!ids.includes(i.id)) {
      ids.push(i.id);
      result.push(i);
    }
  }

  a.forEach(fill);
  b.forEach(fill);

  return result;
}

function setContentRange(key, dispatch) {
  return (response) => {
    const contentRange = response.headers.get('content-range');
    if (contentRange) {
      dispatch({ type: SET_CONTENT_RANGE, key, contentRange });
    }
    return response;
  };
};

export function makeActionCreator(endpoint, fetch) {
  return (key, resource, fetchConfig = {}) => {
    const get = (params, config) => (dispatch, getState) => {
      const state = getState();
      const search = queryString.stringify(decamelizeKeys(params));
      const url = `${endpoint}/${resource}?${search}`;

      let headers = {
        Prefer: 'count=exact',
        ...withAuthHeader(state.token),
      };

      if (fetchConfig.singular) {
        headers = {
          ...headers,
          Accept: 'application/vnd.pgrst.object+json',
        };
      }

      const options = {
        headers,
      };

      return fetch(url, options)
        .then(checkResponse)
        .then(setContentRange(key, dispatch))
        .then(toJSON)
        .then(makeSuccessAction(key, dispatch, config))
        .then(fetchConfig.handleSuccess && (data => fetchConfig.handleSuccess({ dispatch, data })))
        .catch(fetchConfig.handleFailed && (error => fetchConfig.handleFailed({ dispatch, error })));
    };

    const reset = () => ({ type: RESET_TYPE, key });

    return { get, reset };
  };
}

export function makeIdActionCreator(endpoint, fetch) {
  return (key, resource) => {
    const get = (id, params, config) => (dispatch, getState) => {
      const state = getState();
      const search = queryString.stringify(params);
      const url = `${endpoint}/${resource}/${id}/?${search}`;

      const options = {
        headers: withAuthHeader(state.token),
      };

      return fetch(url, options)
        .then(toJSON)
        .then(makeSuccessAction(key, dispatch, config));
    };

    const reset = () => ({ type: RESET_TYPE, key });

    return { get, reset };
  };
}

export function makeDeleteActionCreator(endpoint, fetch) {
  return (url, options = {}) => params => (dispatch, getState) => {
    const state = getState();
    const search = queryString.stringify(params);
    const fullUrl = `${endpoint}/${url}/?${search}`;
    const fetchOptions = {
      method: 'DELETE',
      headers: withAuthHeader(state.token),
    };

    function callAfter() {
      options.after({ dispatch });
    }

    return fetch(fullUrl, fetchOptions)
      .then(checkResponse)
      .then(options.after ? callAfter : null);
  };
}

export function makeIdDeleteActionCreator(endpoint, fetch) {
  return (url, options = {}) => id => (dispatch, getState) => {
    const state = getState();
    const fullUrl = `${endpoint}/${url}/${id}`;
    const fetchOptions = {
      method: 'DELETE',
      headers: withAuthHeader(state.token),
    };

    function callAfter() {
      options.after({ dispatch });
    }

    return fetch(fullUrl, fetchOptions)
      .then(checkResponse)
      .then(options.after ? callAfter : null);
  };
}

export function makeRawReducer(key, config = {}) {
  const defaultState = config.defaultState || null;

  return (state = defaultState, action) => {
    if (action.type === SUCCESS_TYPE && action.key === key) {
      return action.data;
    }

    return config.reducer ? config.reducer(state, action) : state;
  };
}

export function makeReducer(key) {
  return (state = DEFAULT_STATE, action) => {
    if (action.type === RESET_TYPE && action.key === key) {
      return DEFAULT_STATE;
    }

    if (action.type === REQUEST_TYPE && action.key === key) {
      if (action.merge) {
        return {
          ...state,
          status: 'request',
        };
      }

      if (!action.withoutReset) {
        return {
          ...DEFAULT_STATE,
          status: 'request',
        };
      }
    }

    if (action.type === SUCCESS_TYPE && action.key === key) {
      if (action.merge) {
        return {
          ...state,
          ...action.data,
          results: uniq(state.results, action.data.results),
          status: 'pending',
        };
      }

      return {
        ...state,
        results: action.data,
        status: 'pending',
      };
    }

    if (action.type === SET_CONTENT_RANGE && action.key === key) {
      return {
        ...state,
        contentRange: action.contentRange,
      };
    }

    return state;
  };
}

export function makePostActionCreator(endpoint, fetch) {
  return (url, options = {}) => (data, where = {}) => (dispatch, getState) => {
    const state = getState();
    const conditions = queryString.stringify(where && decamelizeKeys(where));
    const fullUrl = `${endpoint}/${url}?${conditions}`;
    const fetchOptions = {
      method: options.method || 'POST',
      headers: withAuthHeader(state.token, {
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      }),
      body: JSON.stringify(decamelizeKeys(data), options.whiteList && options.whiteList.map(decamelize)),
    };

    function callAfter(data) {
      options.after({ dispatch, data });
    }

    return fetch(fullUrl, fetchOptions)
      .then(checkResponse)
      .then(toJSON)
      .then(options.after ? callAfter : null);
  };
}

export function makePostIdActionCreator(endpoint, fetch) {
  return (url, options = {}) => (id, data) => (dispatch, getState) => {
    const state = getState();
    const fullUrl = `${endpoint}/${url}/${id}`;
    const fetchOptions = {
      method: options.method || 'POST',
      headers: withAuthHeader(state.token, {
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(decamelizeKeys(data), options.whiteList && options.whiteList.map(decamelize)),
    };

    function callAfter(data) {
      options.after({ dispatch, data });
    }

    return fetch(fullUrl, fetchOptions)
      .then(checkResponse)
      .then(toJSON)
      .then(options.after ? callAfter : null);
  };
}

export function makeSendFileActionCreator(endpoint, fetch) {
  return (url, options = {}) => data => (dispatch, getState) => {
    const state = getState();
    const fullUrl = `${endpoint}/${url}`;
    const fetchOptions = {
      method: options.method || 'POST',
      headers: withAuthHeader(state.token, {}),
      body: data,
    };

    function callAfter(data) {
      options.after({ dispatch, data });
    }

    return fetch(fullUrl, fetchOptions)
      .then(checkResponse)
      .then(toJSON)
      .then(options.after ? callAfter : null);
  };
}
