import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

export default function(Layout, additional) {
  const LayoutRoute = ({ component, ...rest }) => (
    <Route {...rest} render={props => (
      <Layout contentComponent={component} {...additional} {...props} />
    )} />
  );

  LayoutRoute.propTypes = {
    component: PropTypes.any.isRequired,
  };

  return LayoutRoute;
}
