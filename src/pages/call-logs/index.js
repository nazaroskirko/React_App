import React from 'react';
import PropTypes from 'prop-types';
import smartify from './smartify';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Form } from 'react-redux-form';
import InputText from 'components/input-text';
import LoginButton from 'components/login-button';
import MainLayout from 'layouts/main';
import SubMenu from 'components/sub-menu';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import ErrorBox from 'components/error-box';
import CallModal from './call-modal';
import CallInfoModal from './call-info-modal';
import PurchaseModal from './purchase-modal';
import VectorIcon from 'vector-icon';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const iconInfo = require('assets/images/icon-info.png');

const CallLogs = ({
  currentUser,
  submit,
  twilioProcessLog,
  hangUp,
  callModalOpen,
  toggleCallModal,
  clientNumber,
  callInfoModalOpen,
  toggleCallInfoModal,
  callInfo,
  setCallInfo,
  purchaseModalOpen,
  togglePurchaseModal,
  setPurchaseInfo,
  purchaseInfo,
  purchaseNumber,
  resetCallForm,
  callMeta,
  changeCallForm,
}) => {
  return <MainLayout>
    <div className="submenu">
      <div className="active">Call logs</div>
      <div>Contacts</div>
    </div>
    <ManagerDashboard>
      <SalesReps>
        <div className="shadow">
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>From</TableHeaderColumn>
                <TableHeaderColumn>To</TableHeaderColumn>
                <TableHeaderColumn>Start Time</TableHeaderColumn>
                <TableHeaderColumn>Duration, s</TableHeaderColumn>
                <TableHeaderColumn>Direction</TableHeaderColumn>
                <TableHeaderColumn />
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover stripedRows>
              {currentUser.calls.map(entity =>
                <TableRow
                  key={entity.id}
                  onTouchTap={() => {
                    setCallInfo(entity);
                    toggleCallInfoModal();
                  }}
                >
                  <TableRowColumn>
                    {entity.incoming ? entity.number : entity.localNumber.number}
                  </TableRowColumn>
                  <TableRowColumn>
                    {entity.incoming ? currentUser.forwardingNumber.number : entity.number}
                  </TableRowColumn>
                  <TableRowColumn>
                    {(new Date(entity.createdAt)).toLocaleString()}
                  </TableRowColumn>
                  <TableRowColumn>
                    {Math.round(entity.duration)}
                  </TableRowColumn>
                  <TableRowColumn>
                    {entity.incoming ? 'Incoming' : 'Outgoing Dial'}
                  </TableRowColumn>
                  <TableRowColumn style={{ textAlign: 'center' }}>
                    <img src={iconInfo} />
                  </TableRowColumn>
                </TableRow>
              )}
              {currentUser.calls.length === 0 && <TableRow>
                <TableRowColumn style={{ textAlign: 'center' }}>Get started by making a phone call</TableRowColumn>
              </TableRow>}
            </TableBody>
          </Table>
        </div>
      </SalesReps>
      <AddSalesRep>
        <h2>Make a <span className="bolder">Call</span></h2>
        <Form
          model="call"
          onSubmit={submit}
        >
          <InputText
            model=".number"
            floatingLabelText="Phone Number"
            fullWidth
            required
          />
          <div>
            <ErrorBox model="call.commonErrors" show />
          </div>
          <div style={{ height: 30 }} />
          <LoginButton text={<span><WhiteCall width={12} height={12} name="call" /> CALL</span>} />
        </Form>
        <div style={{ height: 30 }} />
        <CallProcessLog>
          {twilioProcessLog.map((message, i) =>
            <p key={i}>&gt; {message}</p>
          )}
        </CallProcessLog>
      </AddSalesRep>
      <CallModal {...{ callModalOpen, hangUp, clientNumber, callMeta }} />
      <CallInfoModal {...{ callInfoModalOpen, toggleCallInfoModal, callInfo }} />
      <PurchaseModal {...{ purchaseModalOpen, togglePurchaseModal, purchaseInfo, purchaseNumber, resetCallForm }} />
    </ManagerDashboard>
  </MainLayout>;
};

const ManagerDashboard = styled.div`
  display: grid;
  grid-template-columns: 1fr 288px;
  grid-column-gap: 56px;
`;

const WhiteCall = styled(VectorIcon)`
  path {
    fill: #fff;
  }
`;

const CallProcessLog = styled.div`
`;

const SalesReps = styled.div`

`;

const AddSalesRep = styled.div`

`;

CallLogs.propTypes = {
  currentUser: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
};

export default smartify(CallLogs);
