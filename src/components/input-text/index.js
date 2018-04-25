import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { Control, Errors } from 'react-redux-form';

const InputText = ({ model, ...rest }) =>
  <Control
    model={model}
    component={TextField}
    controlProps={rest}
  />;

InputText.propTypes = {
  model: PropTypes.string.isRequired,
};

export default InputText;
