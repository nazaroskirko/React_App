import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'components/logo';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import UserIcon from 'material-ui/svg-icons/social/person';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import smartify from './smartify';

const NavigationMenu = ({ currentUser }) => <IconMenu
  iconButtonElement={<IconButton><MenuIcon color="white" /></IconButton>}
  anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
  targetOrigin={{ horizontal: 'left', vertical: 'top' }}
>
  {currentUser.isAnyAdmin && <MenuItem primaryText="Users" containerElement={<Link to="/users" />} />}
  {currentUser.hasAnyRole && <MenuItem primaryText="References" containerElement={<Link to="/references" />} />}
  {currentUser.hasAnyRole && <MenuItem primaryText="Requests" containerElement={<Link to="/requests" />} />}
</IconMenu>;

const UserMenu = () =>
  <IconMenu
    iconButtonElement={<IconButton><UserIcon color="white" /></IconButton>}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
    <MenuItem primaryText="Profile" containerElement={<Link to="/profile" />} />
    <MenuItem primaryText="Logout" containerElement={<Link to="/logout" />} />
  </IconMenu>;

const Header = ({ title, currentUser }) =>
  <AppBar
    title={title}
    iconElementRight={<UserMenu />}
    iconElementLeft={<NavigationMenu currentUser={currentUser} />}
    style={{ backgroundColor: '#78909C' }}
  />;

function makeAction(item) {
  if (item.handler) {
    return (
      <ActionButton onClick={item.handler} key={item.icon}>
        <Icon name={item.icon} {...item.iconProps} />
      </ActionButton>
    );
  }

  if (item.to) {
    return (
      <ActionLink to={item.to} key={item.icon}>
        <Icon name={item.icon} {...item.iconProps} />
      </ActionLink>
    );
  }

  return <span>Unk action</span>;
}

const logo = <Logo width={165} height={19} />;

const Content = styled.div`
  display: block;
  flex: 1;
  color: white;
  font-size: 20px;
`;

const ActionLink = styled(Link)`
  margin-right: 16px;
  margin-left: 16px;

  path {
    fill: white;
  }
`;

const ActionButton = styled.div`
  margin-right: 16px;
  margin-left: 16px;
  cursor: pointer;

  path {
    fill: white;
  }
`;

const Container = styled.div`
  height: 56px;
  background-color: #0288d1;
  display: flex;
  align-items: center;
`;

Header.propTypes = {
  title: PropTypes.any,
  actions: PropTypes.array,
  withBack: PropTypes.bool,
  currentUser: PropTypes.object.isRequired,
};

export default smartify(Header);
