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
import postRequest from "../services/requests/postRequest";
import { connect } from "react-redux";
import showErrorAlert from "../actions/signForm/errorAlert";
import showSuccessAlert from "../actions/signForm/successAlert";

//eslint-disable-next-line
const EMEIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const DEFAULT_ERROR_MESSAGE = [
  {
    detail:
      "Your request cannot be processed in this moment. Please, try it later. Thank you :)"
  }
];

const DEFAULT_SUCCESS_MESSAGE = "Your request was registered. Check e-mail :)";

class SupportForm extends Component {
  initialState = () => ({
    blockSubmit: true,
    validateEmail: null,
    request: {
      email: null,
      description: "",
      recoverPassword: 0
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
        recoverPassword: event.target.checked ? 1 : 0
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
    postRequest(Api.requestPath(), this.supportAttributes()).then(responce => {
      if (responce.status === 201) {
        this.props.handleSuccess();
      } else {
        this.props.handleError(responce);
      }
    });
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
            value={this.state.request.description}
            onChange={this.handleChangeDescription}
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

export default connect(
  state => ({
    notice: state.notice
  }),
  dispatch => ({
    handleError: result => {
      result.body = DEFAULT_ERROR_MESSAGE;
      dispatch(showErrorAlert(result));
    },
    handleSuccess: () => {
      dispatch(showSuccessAlert(DEFAULT_SUCCESS_MESSAGE));
    }
  })
)(SupportForm);
