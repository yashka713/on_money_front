import React, { Component } from "react";
import { Button } from "react-bootstrap";
import FieldGroup from "./FieldGroup";
import { connect } from "react-redux";
import { push } from "react-router-redux";
// services
import startSessionRequest from "../services/requests/startSessionRequest";
// actions
import changeEmail from "../actions/signForm/changeEmail";
import changePassword from "../actions/signForm/changePassword";
import clearSignFields from "../actions/signForm/clearSignFields";
import successAuth from "../actions/successAuth";
import showSuccessAlert from "../actions/successAlert";
import showErrorAlert from "../actions/signForm/errorAlert";

class SignForm extends Component {
  constructor(props) {
    super(props);

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.props.handleChangeEmail(event.target.value);
  }

  handleChangePassword(event) {
    this.props.handleChangePassword(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = event.target.action;
    startSessionRequest(url, this.props.auth).then(responce => {
      if (responce.status === 200 || responce.status === 201) {
        this.props.login(responce.current_user);
      } else {
        this.props.handleError(responce);
      }
    });
    return false;
  }

  render() {
    return (
      <form
        action={this.props.action}
        method="post"
        id={this.props.id}
        className="login-form"
        onSubmit={this.handleSubmit}
      >
        <FieldGroup
          id={`${this.props.id}Email`}
          type="email"
          label="Email address:"
          required
          placeholder="Enter email"
          onChange={this.handleChangeEmail}
        />
        <FieldGroup
          id={`${this.props.id}Password`}
          label="Password:"
          type="password"
          required
          placeholder="password"
          onChange={this.handleChangePassword}
        />
        <Button type="submit" bsStyle="primary">
          Submit
        </Button>
      </form>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
    notice: state.notice
  }),
  dispatch => ({
    handleChangeEmail: inputValue => {
      dispatch(changeEmail(inputValue));
    },
    handleChangePassword: inputValue => {
      dispatch(changePassword(inputValue));
    },
    handleError: result => {
      dispatch(showErrorAlert(result));
    },
    login: user => {
      dispatch(successAuth(user));
      dispatch(clearSignFields());
      dispatch(push("/"));
      dispatch(showSuccessAlert(true));
    }
  })
)(SignForm);
