import React from 'react';
import PropTypes from 'prop-types';
import DialogBox from 'components/dialog-box';
import DialogBoxButton from 'components/dialog-box/button';
import styled from 'styled-components';

const PurchaseModal = ({
  purchaseModalOpen,
  togglePurchaseModal,
  purchaseInfo,
  purchaseNumber,
}) => {
  return <DialogBox
    open={purchaseModalOpen}
    onRequestClose={togglePurchaseModal}
    actions={[
      <DialogBoxButton
        key="no"
        label="no"
        onClick={togglePurchaseModal}
        hoverColor="#eaeaea"
        style={{
          borderRight: '1px solid #cecece',
        }}
      />,
      <DialogBoxButton
        key="yes"
        label="yes"
        onClick={purchaseNumber}
        hoverColor="#eaeaea"
      />,
    ]}
  >
    <RedLine />
    <Content>
      { purchaseInfo.error
        ? purchaseInfo.error
        : `You dont have a phone with the area code ${purchaseInfo.areaCode}, would you like to purchase a number?`
      }
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

PurchaseModal.propTypes = {
  purchaseInfo: PropTypes.object.isRequired,
  purchaseModalOpen: PropTypes.bool.isRequired,
  togglePurchaseModal: PropTypes.func.isRequired,
  purchaseNumber: PropTypes.func.isRequired,
};

export default PurchaseModal;
