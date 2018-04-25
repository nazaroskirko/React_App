import React from 'react';
import PropTypes from 'prop-types';
import { Errors } from 'react-redux-form';
import styled from 'styled-components';

const ErrorBox = ({ model, ...rest }) =>
  <StyledErrors
    model={model}
    wrapper="ul"
    component="li"
    show
    {...rest}
  />;

const StyledErrors = styled(Errors)`
  list-style: none;
  color: #ab3232;
  margin-left: 0;
  padding-left: 0;
  margin-top: 2rem;
`;

ErrorBox.propTypes = {
  model: PropTypes.string.isRequired,
};

export default ErrorBox;
