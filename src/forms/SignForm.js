import React, { Component } from "react";
import { Button } from "react-bootstrap";
import FieldGroup from "./FieldGroup";
import { connect } from "react-redux";
import { push } from "react-router-redux";
// utils
import startSession from "../utils/session/startSession";
// actions
import changeEmail from "../actions/signForm/changeEmail";
import changePassword from "../actions/signForm/changePassword";
import showErrorAlert from "../actions/signForm/errorAlert";
import successAuth from "../actions/successAuth";
import showSuccessAlert from "../actions/successAlert";

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
    const answer = startSession(url, this.props.auth);
    answer.then(result => {
      if (result && result.status >= 200 && result.status < 300) {
        this.props.login();
      } else {
        this.props.errorAlert(true);
      }
    });
    return false;
  }

  render() {
    return (
      <div>
        <br />
        <p className="text-center">example@example.com</p>
        <p className="text-center">onioni@example.com</p>
        <p className="text-center">password</p>
        <form
          action={this.props.action}
          method="post"
          id={this.props.id}
          className="custom-form"
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
      </div>
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
    errorAlert: status => {
      dispatch(showErrorAlert(status));
    },
    login: () => {
      dispatch(successAuth());
      dispatch(push("/"));
      dispatch(showSuccessAlert(true));
    }
  })
)(SignForm);
