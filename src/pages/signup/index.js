import React from 'react';
import PropTypes from 'prop-types';
import smartify from './smartify';
import { Link } from 'react-router-dom';
import { Form } from 'react-redux-form';
import InputText from 'components/input-text';
import { Redirect } from 'react-router';
import ErrorBox from 'components/error-box';
import styled from 'styled-components';
import LoginButton from 'components/login-button';

const Signup = ({ form, submit }) => (
  <StyledForm
    model="signup"
    onSubmit={submit}
  >
    {form.submitted && <Redirect push to="/" />}
    <Manager>
      MANAGER
    </Manager>
    <Register>
      Register
    </Register>
    <div>
      <InputText
        model=".user.firstName"
        floatingLabelText="Name"
        fullWidth
        autoFocus
        required
      />
      <br />
      <InputText
        model=".user.email"
        floatingLabelText="Email"
        fullWidth
        required
      />
      <br />
      <InputText
        model=".user.companyAttributes.name"
        floatingLabelText="Company name"
        fullWidth
        required
      />
      <br />
      <InputText
        model=".user.companyAttributes.url"
        floatingLabelText="Company url"
        fullWidth
        required
      />
      <br />
      <InputText
        model=".user.password"
        floatingLabelText="Password"
        type="password"
        autoComplete="new-password"
        fullWidth
        required
      />
      <br />
      <InputText
        model=".user.passwordConfirmation"
        floatingLabelText="Confirm password"
        type="password"
        autoComplete="new-password"
        fullWidth
        required
      />
    </div>
    <div>
      <ErrorBox model="signup.commonErrors" show />
    </div>
    <div style={{ margin: '39px 0 38px' }}>
      <LoginButton text="REGISTER" />
    </div>
    <div>
      <StyledLink to="/">Login</StyledLink>
    </div>
  </StyledForm>
);

const StyledForm = styled(Form)`
  width: 311px;
  margin: 30px auto 57px auto;
`;

const Manager = styled.div`
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 2.9px;
  text-align: center;
  color: #9da1a6;
`;

const Register = styled.div`
  font-size: 32px;
  font-weight: 300;
  letter-spacing: -0.6px;
  text-align: center;
  color: #313334;
  margin: 33px 0 23px;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 12px;
  letter-spacing: 0.2px;
  color: #555759;
`;

Signup.propTypes = {
  submit: PropTypes.func.isRequired,
  form: PropTypes.any,
};

export default smartify(Signup);
