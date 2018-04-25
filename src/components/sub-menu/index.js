import React from 'react';
import styled from 'styled-components';

const SubMenu = () =>
  <Container>
    <Item className="active">Sales Reps</Item>
    <Item>Contacts</Item>
    <Item>Call logs</Item>
  </Container>;

const Container = styled.div`
  display: flex;
  padding: 1rem 0;
`;

const Item = styled.div`
  font-size: 16px;
  padding: 4px 32px;
  cursor: pointer;
  &.active {
    font-weight: 500;
  }
  &:not(:last-child) {
    border-right: 1px solid #8e8e8e;
  }
`;

export default SubMenu;
