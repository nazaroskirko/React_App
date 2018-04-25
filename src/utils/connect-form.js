import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { createStructuredSelector } from 'reselect';
import errorTranslates from 'constants/error-translates';
import api from 'api';

const identity = x => x;

const errorTransform = err => {
  let error = errorTranslates[err.error] || err.error;
  if (typeof err.error.map === 'function') {
    error = err.error.map(e => errorTranslates[e] || e);
  }
  return Promise.reject({
    commonErrors: error,
  });
};

export default (options = {}) => {
  options.modelTransform = options.modelTransform || identity;
  options.errorTransform = options.errorTransform || errorTransform;

  if (!options.form) {
    throw new Error('form is not set');
  }

  if (!options.action) {
    throw new Error('action is not set');
  }

  const selector = createStructuredSelector({
    form: state => state.forms[options.form].$form,
  });

  const mapDispatchToProps = dispatch => ({
    reset: (model) => dispatch(actions.reset(model)),
    change: (model, data) => dispatch(actions.change(model, data)),
    submit: (model) => {
      const data = options.modelTransform(model);
      const request = dispatch(api.actions[options.action](data))
        .then(getState => options.after ? options.after({ dispatch, getState }) : null)
        .catch(options.errorTransform);
      dispatch(actions.submit(options.form, request, { fields: true }));
    },
  });

  return connect(selector, mapDispatchToProps);
};
