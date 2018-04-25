import React from 'react';
import PropTypes from 'prop-types';

import call from './call.svg';
import download from './download.svg';
import hangUp from './hang-up.svg';
import mute from './mute.svg';
import muted from './muted.svg';
import play from './play.svg';
import record from './record.svg';
import pin from './pin.svg';
import close from './close.svg';
import voiceWave from './voice-wave.svg';
import trash from './trash.svg';
import chevronLeft from './chevron-left.svg';
import edit from './edit.svg';

const list = {
  call,
  download,
  hangUp,
  mute,
  muted,
  play,
  record,
  pin,
  close,
  voiceWave,
  trash,
  chevronLeft,
  edit,
};

const VectorIcon = ({ name, ...props }) => {
  if (!list[name]) {
    throw new Error(`Icon not found ${name}`);
  }

  return React.createElement(list[name], props);
};

VectorIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default VectorIcon;
