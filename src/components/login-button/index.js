import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LoginButton = ({ text, ...rest }) =>
  <StyledButton {...rest}>
    {text}
  </StyledButton>;

const StyledButton = styled.button`
  width: 100%;
  background-color: #56C2CD;
  height: 53px;
  border: none;
  border-radius: 26px;
  font-size: 17px;
  letter-spacing: 0.7px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
`;

LoginButton.propTypes = {
  text: PropTypes.any.isRequired,
};

export default LoginButton;
