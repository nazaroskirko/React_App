import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';

const DialogBox = ({ children, open, ...rest }) => {
  return <Dialog
    open={open}
    className="five-px-modal-border-radius"
    actionsContainerStyle={{
      padding: 0,
      display: 'flex',
    }}
    bodyStyle={{
      padding: '0',
      borderRadius: '5px',
    }}
    {...rest}
  >
    {children}
  </Dialog>;
};

DialogBox.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.any,
};

export default DialogBox;
