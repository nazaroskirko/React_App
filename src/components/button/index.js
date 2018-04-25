import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Button = ({ component = 'button', primary, bordered, warning, className, ...rest }) => {
  const classes = cx('button', {
    'button--bordered': bordered,
    'button--warning': warning,
    'button--primary': primary,
  }, className);

  return React.createElement(component, {
    className: classes,
    ...rest,
  });
};

Button.propTypes = {
  component: PropTypes.any,
  className: PropTypes.string,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  bordered: PropTypes.bool,
  warning: PropTypes.bool,
};

export default Button;
