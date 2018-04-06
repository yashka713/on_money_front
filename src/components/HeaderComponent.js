import React from "react";

import { Navbar, Nav, NavItem } from "react-bootstrap";
import LogoutComponent from "./Logout";

export const HeaderComponent = () => {
  return (
    <header className="header">
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href={null} className="cursor-pointer">
              Hello, user
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">
              User
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              <LogoutComponent />
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};
