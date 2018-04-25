import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import VectorIcon from 'vector-icon';
import InputText from 'components/input-text';
import { Form } from 'react-redux-form';
import styled from 'styled-components';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const CallInfoModal = ({
  callInfoModalOpen,
  callInfo,
  toggleCallInfoModal,
}) => {
  const recording = callInfo.recordings && callInfo.recordings.length > 0 && callInfo.recordings[0];
  function playPause() {
    const recElement = document.getElementById(`play-${recording.sid}`);
    recElement.paused ? recElement.play() : recElement.pause();
    return false;
  }
  return <Dialog
    className="five-px-modal-border-radius"
    open={callInfoModalOpen}
    onRequestClose={toggleCallInfoModal}
    bodyStyle={{
      padding: '0',
      borderRadius: '5px',
    }}
    overlayStyle={{
      opacity: 0,
    }}
    contentStyle={{
      margin: '0 29px 0',
      width: 'calc(100% - 402px)',
      maxWidth: 'calc(100% - 402px)',
    }}
  >
    <GradientLine />
    <div style={{ padding: '0 8px' }}>
      <Table>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableRowColumn>
              {callInfo.incoming ? callInfo.number : callInfo.localNumber && callInfo.localNumber.number}
            </TableRowColumn>
            <TableRowColumn>
              {callInfo.incoming ? callInfo.answerNumber : callInfo.number}
            </TableRowColumn>
            <TableRowColumn>
              {(new Date(callInfo.createdAt)).toLocaleString()}
            </TableRowColumn>
            <TableRowColumn>
              {Math.round(callInfo.duration)}
            </TableRowColumn>
            <TableRowColumn>
              {callInfo.incoming ? 'Incoming' : 'Outgoing Dial'}
            </TableRowColumn>
            <TableRowColumn style={{ textAlign: 'center' }}>
              <a href="javascript:void(0)" onClick={toggleCallInfoModal}>
                <VectorIcon name="close" />
              </a>
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <DialogBody>
      <CallInfo>
        <div style={{ minWidth: 280 }}>
          <div style={{ fontWeight: 300, fontSize: 33 }}>Phone Number</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <VectorIcon name="pin" />
            <span style={{ margin: '0 11px', whiteSpace: 'nowrap' }}>{callInfo.country}, {callInfo.geoName}</span>
            <GrayCall name="call" />
            <span style={{ margin: '0 11px', fontSize: '18px', fontWeight: 300 }}>{callInfo['number']}</span>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <VectorIcon name="voiceWave" />
        </div>
        {recording && <div style={{ width: 150, minWidth: 150 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <audio id={`play-${recording.sid}`} src={recording.play}>Your browser does not support the <code>audio</code> element.</audio>
            <a href="javascript:void(0)" onClick={playPause}><VectorIcon name="play" /></a>
            <div style={{ marginLeft: '9px' }}>Play Recording</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '16.59px', textAlign: 'center' }}>
              <a href={recording.download} download={recording.name}><VectorIcon name="download" /></a>
            </div>
            <div style={{ marginLeft: '9px' }}>Download Recording</div>
          </div>
        </div>}
      </CallInfo>
      <Form model="call">
        <InputText
          model=".notes"
          defaultValue={callInfo.notes}
          inputStyle={{ fontWeight: 300, fontSize: 13 }}
          rows={4}
          multiLine
          fullWidth
        />
      </Form>
    </DialogBody>
  </Dialog>;
};

const DialogBody = styled.div`
  padding: 2rem 41px;
  border-top: 1px solid #eee;
`;

const CallInfo = styled.div`
  display: flex;
  font-size: 13px;
  justify-content: space-between;
  color: #555759;
  margin-bottom: 2rem;
  > div {
    line-height: 34px;
  }
`;

const GradientLine = styled.div`
  width: 100%;
  height: 5px;
  background-image: linear-gradient(225deg, #56c2cd, #83a4d5);
`;

const GrayCall = styled(VectorIcon)`
  width: 11px;
  height: 11px;
  path {
    fill: #cecece;
  }
`;

CallInfoModal.propTypes = {
  callInfoModalOpen: PropTypes.bool.isRequired,
  callInfo: PropTypes.object.isRequired,
  toggleCallInfoModal: PropTypes.func.isRequired,
};

export default CallInfoModal;
