import React from 'react';
import PropTypes from 'prop-types';
import DialogBox from 'components/dialog-box';
import DialogBoxButton from 'components/dialog-box/button';
import styled from 'styled-components';

const AlertBox = ({
  yesAction,
  children,
  onRequestClose,
  ...rest
}) => {
  return <DialogBox
    onRequestClose={onRequestClose}
    actions={[
      <DialogBoxButton
        key="no"
        label="no"
        onClick={onRequestClose}
        hoverColor="#eaeaea"
        style={{
          borderRight: '1px solid #cecece',
        }}
      />,
      <DialogBoxButton
        key="yes"
        label="yes"
        onClick={yesAction}
        hoverColor="#eaeaea"
      />,
    ]}
    {...rest}
  >
    <RedLine />
    <Content>
      {children}
    </Content>
  </DialogBox>;
};

const RedLine = styled.div`
  width: 100%;
  height: 4px;
  background-color: #e13240;
`;

const Content = styled.div`
  padding: 2rem 41px;
  border-bottom: 1px solid #cecece;
`;

AlertBox.propTypes = {
  yesAction: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  children: PropTypes.any,
};

export default AlertBox;
