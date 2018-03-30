import React, { Component } from "react";
import "../styles/HeaderComponent.css";
import "../styles/LoginModal.css";

import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Button, Modal, Tabs, Tab } from "react-bootstrap";

import SignForm from "../forms/SignForm";

// import LoginModal from "./LoginModal";

class HeaderComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showModal: false
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div className="header">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">On Money React</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem href="#" onClick={this.open.bind(this)}>Come in</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header>
            <Modal.Title>
              Choose action:
              <Button href="#" onClick={this.close.bind(this)} bsClass="pull-right">X</Button>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
              <Tab eventKey={1} title="Sign in">
                <SignForm
                  id="SignIn"
                  action="http://localhost:3000/auth/sign_in"
                />
              </Tab>
              <Tab eventKey={2} title="Sign up">
                <SignForm
                  id="SignUp"
                  action="http://localhost:3000/auth"
                />
              </Tab>
            </Tabs>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default HeaderComponent;
