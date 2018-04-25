import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Icon = ({ name }) =>
  <i
    className={cx([
      'fa',
      'fa-lg',
      'fa-' + name,
    ])}
  />;

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
