import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from 'layouts/main';
import styled from 'styled-components';
import VectorIcon from 'vector-icon';
import AlertBox from 'components/alert-box';
import smartify from './smartify';
import { Form } from 'react-redux-form';
import InputText from 'components/input-text';
import ErrorBox from 'components/error-box';
import cx from 'classnames';
import RaisedButton from 'material-ui/RaisedButton';

const MyNumbers = ({
  submit,
  currentUser,
  removeNumber,
  setNumberToRemove,
  numberToRemove,
  removeNumberModalOpen,
  toggleRemoveNumberModal,
  forwardingNumberFormOpen,
  toggleForwardingNumberForm,
}) => <MainLayout>
  <TwoColumns>
    <div>
      <div className="my-numbers-header">
        <div>My Outbound Number</div>
        <div className="my-numbers-header-help">
          Inbound calls to your purchase number will be forwarded to you outbound number
        </div>
      </div>
      <OutboundNumberWrapper>
        <NumberHelpText>
          <VectorIcon name="call" />
          <span>Outbound Number</span>
        </NumberHelpText>
        <OutboundNumber onClick={toggleForwardingNumberForm} className={cx({ 'is-invisible': forwardingNumberFormOpen })}>
          {currentUser.forwardingNumber && currentUser.forwardingNumber.number}
          <VectorIcon name="edit" />
        </OutboundNumber>
        <Form
          model="forwardingNumber"
          onSubmit={submit}
          style={{
            display: forwardingNumberFormOpen ? 'block' : 'none',
          }}
        >
          <InputText
            model=".number"
          />
          <RaisedButton
            label="update"
            type="submit"
            style={{ marginLeft: 12 }}
            primary
          />
        </Form>
        <ErrorBox model="forwardingNumber.commonErrors" show />
      </OutboundNumberWrapper>
    </div>
    <div>
      <div className="my-numbers-header">
        <div>My Purchased Numbers</div>
      </div>
      {currentUser.localNumbers.map(localNumber =>
        <NumberWrapper key={localNumber.id}>
          <div style={{ width: '50%' }}>
            <NumberHelpText>
              <VectorIcon name="pin" />
              <span>Location</span>
            </NumberHelpText>
            <NumberLocation>
              {localNumber.geoName + ', ' + localNumber.country}
            </NumberLocation>
          </div>
          <div style={{ width: '40%' }}>
            <NumberHelpText>
              <VectorIcon name="call" />
              <span>Purchased Number</span>
            </NumberHelpText>
            <PurchasedNumber>{localNumber.number}</PurchasedNumber>
          </div>
          <div style={{ width: '10%' }}>
            <VectorIcon name="trash" style={{ cursor: 'pointer' }} onClick={e => {
              setNumberToRemove(localNumber);
              toggleRemoveNumberModal();
            }} />
          </div>
        </NumberWrapper>
      )}
    </div>
  </TwoColumns>
  <AlertBox
    open={removeNumberModalOpen}
    onRequestClose={toggleRemoveNumberModal}
    yesAction={removeNumber(numberToRemove.id)}
  >
    Remove number <em>{numberToRemove.number}</em> ?
  </AlertBox>
</MainLayout>;

const OutboundNumber = styled.div`
  font-size: 20px;
  letter-spacing: 0.8px;
  color: #5cbece;
  line-height: 24px;
  padding: .5rem 0;
  cursor: pointer;
  &.isInvisible {
    display: none;
  }
  > svg {
    margin-left: 8px;
    path {
      opacity: 0;
    }
  }
  &:hover {
    > svg {
      path {
        opacity: 1;
      }
    }
  }
`;

const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  > div {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 65px 0 rgba(20, 41, 59, 0.22);
    div.my-numbers-header {
      font-size: 24px;
      color: #555759;
      padding-left: 30px;
      height: 96px;
      display: flex;
      align-items: center;
      div.my-numbers-header-help {
        font-size: 13px;
        font-weight: 300;
        line-height: 1.23;
        color: #737373;
      }
      > div {
        flex-grow: 1;
        width: 50%;
        padding-right: 30px;
      }
    }
  }
`;

const NumberWrapper = styled.div`
  padding: 1.5rem 30px;
  border-top: 1px solid #fafafa;
  display: flex;
  align-items: center;
`;

const OutboundNumberWrapper = styled.div`
  padding: 1.5rem 30px;
  border-top: 1px solid #fafafa;
`;

const NumberLocation = styled.div`
  font-size: 18px;
  color: #555759;
  line-height: 24px;
  padding: .5rem 0;
`;

const NumberHelpText = styled.div`
  color: #a1a1a1;
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 1.5;
  > svg {
    margin-right: 8px;
  }
`;

const PurchasedNumber = styled.div`
  font-size: 20px;
  letter-spacing: 0.8px;
  color: #5cbece;
  line-height: 24px;
  padding: .5rem 0;
`;

MyNumbers.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default smartify(MyNumbers);
