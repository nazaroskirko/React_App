import React from 'react';
import PropTypes from 'prop-types';
import Cleave from 'cleave.js/react';
import styled from 'styled-components';

const DefaultInput = (props) => <input
  {...props}
/>;

const controlTypes = {
  default: DefaultInput,
  cleave: Cleave,
};

const CustomInput = ({
  value,
  reset,
  controlType = 'default',
  white,
  ...rest
}) => (
  <Container>
    {React.createElement(controlTypes[controlType], {
      value,
      ...rest,
    })}
  </Container>
);

const Container = styled.div`
  position: relative;
`;

CustomInput.propTypes = {
  white: PropTypes.any,
  value: PropTypes.any,
  reset: PropTypes.func.isRequired,
  controlType: PropTypes.string,
};

export default CustomInput;
