import React from 'react';
import PropTypes from 'prop-types';
import { Control, Errors } from 'react-redux-form';
import CustomInput from './custom-input';
import styled from 'styled-components';
import cx from 'classnames';

const Input = ({ type = 'text', model, white, validators, className, ...rest }) => (
  <Container className={className}>
    <Control
      className={cx('input', { 'input--default': !white, 'input--white': white })}
      white={white}
      controlProps={rest}
      validators={validators}
      type={type}
      model={model}
      component={CustomInput}
      mapProps={{
        reset: props => e => {
          props.onChange('');
          e.preventDefault();
        },
      }}
    />
    <Errors
      model={model}
      show={field => field.submitFailed}
      wrapper={ErrorsList}
      component="li"
      messages={{
        required: 'Это поле обязательное',
        isEmail: 'Введите корректный e-mail',
      }}
    />
  </Container>
);

const Container = styled.div`
  margin-bottom: 20px;
`;

const ErrorsList = styled.ul`
  font-size: 14px;
  margin-bottom: 20px;
  margin-top: 10px;
  color: #ab3232;
  display: block;
  list-style: none;
  padding: 0;
`;

Input.propTypes = {
  type: PropTypes.string,
  controlType: PropTypes.string,
  model: PropTypes.string.isRequired,
  white: PropTypes.bool,
  validators: PropTypes.object,
  className: PropTypes.string,
};

export default Input;
