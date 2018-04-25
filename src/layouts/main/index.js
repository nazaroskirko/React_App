import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Logo from 'components/logo';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Main = ({ title, actions, toolbar, children, withBack }) => (
  <Container>
    <Helmet title={title} />
    <Header>
      <div>
        <Link to="/">
          <Logo height={33} width={155} />
        </Link>
      </div>
      <MainMenu>
        <Link to="/logout">Logout</Link>
        <Link to="/my-numbers">My Numbers</Link>
      </MainMenu>
    </Header>
    <Wrapper className={toolbar && 'with-toolbar'}>
      {children}
    </Wrapper>
    {toolbar && <Toolbar>{toolbar}</Toolbar>}
  </Container>
);

const Container = styled.div`
  height: 100vh;
`;

const Header = styled.div`
  padding: 0 31px;
  height: 46px;
  background-color: #fff;
  display: flex;
  align-items: center;
`;

const MainMenu = styled.div`
  text-align: right;
  flex-grow: 1;
  > a {
    padding-left: 8px;
  }
`;

const Toolbar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition: transform .2s ease-out;
  z-index: 999;
`;

const Wrapper = styled.div`
  padding: 2rem 38px;

  &.with-toolbar {
    margin-bottom: 66px;
  }
`;

export const Content = styled.div`
  padding: 0 15px;
`;

Main.propTypes = {
  title: PropTypes.any,
  withBack: PropTypes.bool,
  actions: PropTypes.array,
  children: PropTypes.any,
  toolbar: PropTypes.any,
};

export default Main;
