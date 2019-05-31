import React, { Component } from "react";
import {
  Form,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  Checkbox
} from "react-bootstrap";
import Api from "../api/Api";

//eslint-disable-next-line
const EMEIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default class SupportForm extends Component {
  initialState = () => ({
    blockSubmit: true,
    validateEmail: null,
    request: {
      email: null,
      description: "",
      recoverPassword: false
    }
  });

  state = this.initialState();

  handleChangeEmail = event =>
    this.setState(
      {
        request: {
          ...this.state.request,
          email: event.target.value
        }
      },
      () => {
        this.formValidation();
      }
    );

  formValidation = () => {
    const email = this.state.request.email;

    if (email && email.match(EMEIL_REGEXP)) {
      this.setState({
        blockSubmit: false,
        validateEmail: "success"
      });
    } else if (email) {
      this.setState({
        blockSubmit: true,
        validateEmail: "warning"
      });
    } else {
      this.setState({
        blockSubmit: true,
        validateEmail: "error"
      });
    }
  };

  handleChangeRecoverPassword = event =>
    this.setState({
      request: {
        ...this.state.request,
        recoverPassword: event.target.checked
      }
    });

  handleChangeDescription = event =>
    this.setState({
      request: {
        ...this.state.request,
        description: event.target.value
      }
    });

  supportAttributes = () => ({
    request: {
      email: this.state.request.email,
      description: this.state.request.description,
      recoverPassword: this.state.request.recoverPassword
    }
  });

  handleSubmit = event => {
    event.preventDefault();
    console.log("submitted", this.supportAttributes());
    // TODO: add endpoint for sending SupportRequest
    return false;
  };

  render() {
    return (
      <Form
        action={Api.supportPath()}
        method="post"
        id="supportForm"
        className="support-form"
        onSubmit={this.handleSubmit}
      >
        <FormGroup
          controlId="supportFormEmail"
          validationState={this.state.validateEmail}
        >
          <ControlLabel>Email address:</ControlLabel>
          <FormControl
            type="email"
            required
            placeholder="Enter email"
            onChange={this.handleChangeEmail}
          />
        </FormGroup>
        <Checkbox
          checked={this.state.request.recoverPassword}
          onChange={this.handleChangeRecoverPassword}
        >
          Just recover the password
        </Checkbox>
        <FormGroup controlId="supportFormTextarea">
          <ControlLabel>Your request:</ControlLabel>
          <FormControl
            componentClass="textarea"
            placeholder="Type your request hire"
            rows="4"
            onChange={this.handleChangeDescription}
            disabled={this.state.request.recoverPassword}
          />
        </FormGroup>
        <Button
          form="supportForm"
          type="submit"
          bsStyle="primary"
          disabled={this.state.blockSubmit}
        >
          Send request
        </Button>
      </Form>
    );
  }
}
