import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { required } from 'utils/validators';
import GuestLayout from 'layouts/guest';
import styled from 'styled-components';
import smartify from './smartify';
import InputText from 'components/input-text';
import ErrorBox from 'components/error-box';
import LoginButton from 'components/login-button';

const validators = {
  required,
};

const Login = ({ submit }) => (
  <StyledForm
    model="login"
    onSubmit={submit}
  >
    <Manager>
      MANAGER
    </Manager>
    <Register>
      Sign In
    </Register>
    <div>
      <InputText
        model=".auth.email"
        floatingLabelText="Email"
        fullWidth
        required
        autoFocus
      />
      <br />
      <InputText
        model=".auth.password"
        type="password"
        floatingLabelText="Password"
        fullWidth
        required
      />
    </div>
    <div>
      <ErrorBox model="login.commonErrors" show />
    </div>
    <div style={{ margin: '39px 0 38px' }}>
      <LoginButton text="SIGN IN" />
    </div>
    <BottomLinks>
      <Link to="/signup">Register</Link>
      <Link to="/reset-password">Reset password</Link>
    </BottomLinks>
  </StyledForm>
);

const SmartLogin = smartify(Login);

const LoginWithLayout = () => (
  <GuestLayout contentComponent={SmartLogin} title="Login" />
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

const BottomLinks = styled.div`
  text-align: center;
  > a {
    display: inline-block;
    font-size: 12px;
    letter-spacing: 0.2px;
    color: #555759;
  }
  > a:first-child {
    margin-right: 10px;
  }
`;
Login.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default LoginWithLayout;
