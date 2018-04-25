import React from 'react';
import PropTypes from 'prop-types';
import { Control } from 'react-redux-form';

const InputHidden = ({ model, ...rest }) =>
  <Control
    model={model}
    type="hidden"
    controlProps={rest}
  />;

InputHidden.propTypes = {
  model: PropTypes.string.isRequired,
};

export default InputHidden;
