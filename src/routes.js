import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/home';

import Signup from './pages/signup';
import Login from './pages/login';
import Logout from './pages/logout';
import PasswordReset from './pages/password-reset';
import ResetPassword from './pages/reset-password';
import CallLogs from './pages/call-logs';
import MyNumbers from './pages/my-numbers';

import NotFound from './pages/not-found';

import makeLayoutRoute from './utils/make-layout-route';
import GuestLayout from './layouts/guest';
import PrivateLayout from './layouts/private';

const GuestRoute = makeLayoutRoute(GuestLayout);
const PrivateRoute = makeLayoutRoute(PrivateLayout, { loginComponent: Login });

const Routes = () => (
  <Switch>
    <PrivateRoute exact path="/" component={Home} />
    <PrivateRoute exact path="/logout" component={Logout} />
    <PrivateRoute exact path="/call-logs" component={CallLogs} />
    <PrivateRoute exact path="/my-numbers" component={MyNumbers} />
    <GuestRoute path="/signup" component={Signup} />
    <GuestRoute path="/reset-password" component={ResetPassword} />
    <GuestRoute path="/password-reset/:id/:email" component={PasswordReset} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
