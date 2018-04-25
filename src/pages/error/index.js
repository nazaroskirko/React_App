import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from 'layouts/main';

const ErrorComponent = ({ error }) => {
  if (window.Raven) {
    window.Raven.captureException(error);
  } else {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return (
    <MainLayout title="Something went wrong...">
      Error :( <br /> We are working on it
    </MainLayout>
  );
};

ErrorComponent.propTypes = {
  error: PropTypes.any,
};

export default ErrorComponent;
