import React, { useState } from 'react';
import { connect } from 'react-redux';
import { A, navigate } from 'hookrouter';
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavItem,
} from 'reactstrap';
import PropTypes from 'prop-types';

import { logoutUser } from '../../../actions/authAction';

const NavLinks = ({ isAuthenticated, user, logoutUser }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClick = () => {
    navigate('/sign-in');
    logoutUser();
  };

  const authLinks = (
    <Dropdown
      nav
      isOpen={dropdownOpen}
      toggle={() => setDropdownOpen(isOpen => !isOpen)}
    >
      <DropdownToggle nav caret>
        Welcome, {user && user.username}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Menu</DropdownItem>
        <DropdownItem>
          <A href="/dashboard">Dashboard</A>
        </DropdownItem>
        <DropdownItem>
          <A href="/tickets">Tickets</A>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem>
          <A onClick={handleClick} href="#!">
            Sign-out
          </A>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );

  const guestLinks = (
    <>
      <NavItem>
        <A className="nav-link" href="/home">
          Home
        </A>
      </NavItem>
      <NavItem>
        <A className="nav-link" href="/about">
          About
        </A>
      </NavItem>
      <NavItem>
        <A className="nav-link" href="/sign-up">
          Sign-Up
        </A>
      </NavItem>
      <NavItem>
        <A className="nav-link" href="/sign-in">
          Sign-In
        </A>
      </NavItem>
    </>
  );

  return <>{isAuthenticated ? authLinks : guestLinks}</>;
};

NavLinks.propTypes = {
  isAuthenticated: PropTypes.bool,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth: { isAuthenticated, user } }) => ({
  isAuthenticated,
  user,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavLinks);
