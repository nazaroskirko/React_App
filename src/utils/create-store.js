import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import api from 'api';

export default function(reducers, initialState = {}) {
  const middleware = [thunk];
  const enhancers = [];

  let composeEnhancers = compose;

  if (process.env.NODE_ENV === 'development') {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  const store = createStore(
    combineReducers({
      ...reducers,
      ...api.reducers,
    }),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers,
    )
  );

  return store;
}
