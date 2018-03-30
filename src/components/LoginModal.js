import React, { Component } from "react";
// import { Button, Modal, Tabs, Tab } from "react-bootstrap";
import "../styles/LoginModal.css";
// import SignUpForm from "../forms/SignUpForm";

class LoginModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return <div className="login-modal" />;
  }
}

export default LoginModal;
