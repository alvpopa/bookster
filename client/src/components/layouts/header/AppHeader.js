import React, { useState } from 'react';
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from 'reactstrap';

import NavLinks from '../navLinks/NavLinks';

const AppHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(isOpen => !isOpen);

  return (
    <Navbar id="Navbar" dark expand="md" color="danger">
      <Container>
        <NavbarBrand href="/home">BOOKSTER</NavbarBrand>
        <NavbarToggler onClick={() => toggle()}></NavbarToggler>
        <Collapse navbar isOpen={isOpen}>
          <Nav navbar className="ml-auto">
            <NavLinks />
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default AppHeader;
