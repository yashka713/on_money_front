import React, { Component } from "react";

import { Navbar, Nav, NavItem } from "react-bootstrap";
import LogoutComponent from "../../components/mainPage/Logout";
import UserProfile from "./UserProfile";
import { connect } from "react-redux";

class HeaderComponent extends Component {
  render() {
    return (
      <header className="header">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href={null} className="cursor-pointer">
                Hello, {this.props.current_user.name || "anonymous"}
              </a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1}>
                <UserProfile />
              </NavItem>
              <NavItem eventKey={2}>
                <LogoutComponent />
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

export default connect(state => ({
  current_user: state.current_user
}))(HeaderComponent);
