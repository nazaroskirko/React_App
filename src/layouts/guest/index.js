import React from 'react';
import Logo from 'components/logo';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';

const background = require('assets/images/background.png');

const GuestLayout = ({ contentComponent, title, ...rest }) => (
  <Container>
    <Helmet title={title} />
    <FlexBox>
      <RoundedBox>
        <LogoWrapper>
          <div style={{ margin: '0 auto' }}>
            <Logo />
          </div>
        </LogoWrapper>
        {React.createElement(contentComponent, rest)}
      </RoundedBox>
    </FlexBox>
  </Container>
);

const Container = styled.div`
  background-image: url(${background});
  background-repeat: repeat-y;
  background-size: cover;
  background-position: 50% 0;
  min-height: 100vh;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
`;

const RoundedBox = styled.div`
  width: 616px;
  border-radius: 17px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 20px 45px 0 rgba(0,0,0,0.27);
  margin: 10rem 0;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 158px;
  width: 100%;
  border-bottom: 1px solid #cecece;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  height: 66px;
  font-size: 12px;
  letter-spacing: -0.2px;
`;

GuestLayout.propTypes = {
  contentComponent: PropTypes.any.isRequired,
  title: PropTypes.string,
};

export default GuestLayout;
