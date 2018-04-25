import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

const DialogBoxButton = ({ style = {}, ...rest }) =>
  <FlatButton
    onClick={() => false}
    style={{
      flexGrow: 1,
      height: 71,
      ...style,
    }}
    {...rest}
  />;

DialogBoxButton.propTypes = {
  style: PropTypes.object,
};

export default DialogBoxButton;
