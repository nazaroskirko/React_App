import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import VectorIcon from 'vector-icon';
import InputText from 'components/input-text';
import { Form } from 'react-redux-form';
import styled from 'styled-components';
import smartify from './smartify';
import moment from 'moment';
import 'moment-timezone';

const flags = {
  au: require('assets/images/flags/au.png'),
  ca: require('assets/images/flags/ca.png'),
  us: require('assets/images/flags/us.png'),
  gb: require('assets/images/flags/gb.png'),
  ie: require('assets/images/flags/ie.png'),
};

const buttonStyle = {
  flexGrow: 1,
  height: 71,
  fontWeight: 400,
  fontSize: 13,
};

const CallModal = ({
  hangUp,
  callModalOpen,
  clientNumber,
  callTimer,
  callMeta,
}) => {
  return <Dialog
    title={<ModalTitle>
      <div>Client Number<span className="number">{clientNumber}</span></div>
      <div className="call-timer">
        <div>Ongoing Call:</div>
        <div className="timer">{moment.utc(callTimer).format('HH:mm:ss')}</div>
      </div>
    </ModalTitle>}
    actions={[
      <FlatButton
        key="record"
        label="Recording"
        onClick={() => false}
        style={{
          ...buttonStyle,
          borderRight: '1px solid #888',
        }}
        backgroundColor="#f4f4f4"
        hoverColor="#eaeaea"
        icon={<VectorIcon name="record" />}
      />,
      <FlatButton
        key="mute"
        label="Mute"
        onClick={() => false}
        style={buttonStyle}
        backgroundColor="#f4f4f4"
        hoverColor="#eaeaea"
        icon={<VectorIcon name="mute" />}
      />,
      <FlatButton
        key="handUp"
        label="Hang Up"
        type="submit"
        form="call-modal-form"
        style={{
          ...buttonStyle,
          color: '#fff',
          fontWeight: 'normal',
        }}
        backgroundColor="#e4583e"
        hoverColor="#bc4934"
        icon={<VectorIcon name="hangUp" />}
      />,
    ]}
    open={callModalOpen}
    actionsContainerStyle={{
      padding: 0,
      display: 'flex',
    }}
    titleStyle={{
      height: 110,
      fontSize: 24,
      borderBottom: '1px solid #eee',
      padding: '24px 41px 20px',
    }}
    bodyStyle={{
      padding: '2rem 41px',
    }}
    modal
  >
    <CallInfo>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <VectorIcon name="pin" />
          <span style={{ margin: '0 11px' }}>{callMeta.geoName}, {callMeta.country}</span>
          {callMeta.country && flags[callMeta.country.toLocaleLowerCase()] &&
            <img src={flags[callMeta.country.toLocaleLowerCase()]} style={{ paddingBottom: 2 }} className="flag-icon" />
          }
        </div>
        <div><span style={{ color: '#a1a1a1' }}>Local Time:</span> {moment.tz(new Date(), callMeta.numberTimezone).format('h:mm:ss A')}</div>
      </div>
      <div>
        <div>Number of Calls</div>
        <div style={{ fontSize: 24, fontWeight: 'normal' }}>
          {callMeta.numberOfCalls + ' Call' + (callMeta.numberOfCalls !== 1 ? 's' : '')}
        </div>
      </div>
      <div>
        <div>Last Contacted</div>
        <div style={{ fontSize: 24, fontWeight: 'normal' }}>
          {callMeta.lastContacted ? callMeta.lastContacted + ' ago' : 'Never'}
        </div>
      </div>
    </CallInfo>
    <Form
      id="call-modal-form"
      model="call"
      onSubmit={hangUp}
    >
      <InputText
        model=".notes"
        inputStyle={{ fontWeight: 300, fontSize: 13 }}
        rows={4}
        multiLine
        fullWidth
      />
    </Form>
  </Dialog>;
};

const ModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .number {
    font-weight: 300;
    display: inline-block;
    margin-left: 15px;
  }
  .call-timer {
    text-align: right;
    color: #a1a1a1;
    font-size: 13px;
    font-weight: 300;
    .timer {
      font-size: 23px;
      color: #555759;
    }
  }
`;

const CallInfo = styled.div`
  display: flex;
  font-weight: 300;
  font-size: 13px;
  color: #555759;
  margin-bottom: 2rem;
  > div {
    flex-grow: 1;
    line-height: 28px;
  }
`;

CallModal.propTypes = {
  hangUp: PropTypes.func.isRequired,
  callModalOpen: PropTypes.bool.isRequired,
  clientNumber: PropTypes.string,
  callTimer: PropTypes.number.isRequired,
  callMeta: PropTypes.object.isRequired,
};

export default smartify(CallModal);
