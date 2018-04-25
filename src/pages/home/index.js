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
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table';

const Home = ({ currentUser, submit, removeSalesRep }) =>
  <MainLayout>
    {currentUser.role === 'sales_rep' && <Redirect to="call-logs" />}
    <SubMenu />
    <ManagerDashboard>
      <SalesReps>
        <div className="shadow">
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Forwarding Number</TableHeaderColumn>
                <TableHeaderColumn />
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover>
              {currentUser.salesReps.map(entity =>
                <TableRow
                  key={entity.id}
                  striped
                >
                  <TableRowColumn>
                    {entity.firstName}
                  </TableRowColumn>
                  <TableRowColumn>
                    {entity.email}
                  </TableRowColumn>
                  <TableRowColumn>
                    {entity.forwardingNumber && entity.forwardingNumber.number}
                  </TableRowColumn>
                  <TableRowColumn style={{ textAlign: 'right' }}>
                    <IconButton>
                      <DeleteIcon onClick={removeSalesRep(entity.id)} />
                    </IconButton>
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
            <TableFooter adjustForCheckbox={false}>
              <TableRow>
                <TableRowColumn />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </SalesReps>
      <AddSalesRep>
        <h2><span className="bolder">Add</span> A Sales Rep</h2>
        <Form
          model="salesRep"
          onSubmit={submit}
        >
          <InputText
            model=".user.firstName"
            floatingLabelText="Name"
            fullWidth
            required
          />
          <br />
          <InputText
            model=".user.email"
            floatingLabelText="Email"
            fullWidth
            required
          />
          <br />
          <InputText
            model=".user.forwardingNumberAttributes.number"
            floatingLabelText="Forwarding number"
            fullWidth
            required
          />
          <div>
            <ErrorBox model="salesRep.commonErrors" show />
          </div>
          <div style={{ height: 30 }} />
          <LoginButton text="SEND INVITE" />
        </Form>
      </AddSalesRep>
    </ManagerDashboard>
  </MainLayout>;

const ManagerDashboard = styled.div`
  display: grid;
  grid-template-columns: 1fr 288px;
  grid-column-gap: 56px;
`;

const SalesReps = styled.div`

`;

const AddSalesRep = styled.div`

`;

Home.propTypes = {
  currentUser: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
};

export default smartify(Home);
