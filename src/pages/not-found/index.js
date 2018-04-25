import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

const NotFound = () => (
  <Container>
    <Helmet title="Empty page" />
    <span>We can found nothing :(</span>
  </Container>
);

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default NotFound;
