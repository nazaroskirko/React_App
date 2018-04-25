import React from 'react';
import PropTypes from 'prop-types';
import smartify from './smartify';
import Forbidden from 'pages/forbidden';

const PrivateLayout = ({ contentComponent, loginComponent, ...rest }) => {
  if (!rest.currentUser) {
    return React.createElement(loginComponent, rest);
  }
  return (
    <div>
      {React.createElement(contentComponent, rest)}
    </div>
  );
};

PrivateLayout.propTypes = {
  contentComponent: PropTypes.any.isRequired,
  loginComponent: PropTypes.any.isRequired,
};

export default smartify(PrivateLayout);
