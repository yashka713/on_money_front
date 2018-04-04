import React, { Component } from "react";
import { Button } from "react-bootstrap";
import FieldGroup from "./FieldGroup";
import { connect } from "react-redux";
// utils
import startSession from "../utils/session";
import MainPage from "../components/MainPage";
import SignInPage from "../components/SignInPage";

import { withRouter } from "react-router";

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
      if (result >= 200 && result < 300) {
        this.props.errorAlert(false);
        this.props.setLogin(true);
        console.log(this.props.history);
        this.props.history.push("/main");
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
            placeholder="Enter email"
            onChange={this.handleChangeEmail}
          />
          <FieldGroup
            id={`${this.props.id}Password`}
            label="Password:"
            type="password"
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

export default withRouter(
  connect(
    state => ({
      auth: state.auth,
      notice: state.notice
    }),
    dispatch => ({
      handleChangeEmail: inputValue => {
        dispatch({
          type: "CHANGE_EMAIL",
          payload: inputValue
        });
      },
      handleChangePassword: inputValue => {
        dispatch({
          type: "CHANGE_PASSWORD",
          payload: inputValue
        });
      },
      errorAlert: status => {
        dispatch({
          type: "SHOW_ALERT",
          payload: status
        });
      },
      setLogin: status => {
        dispatch({
          type: "SET_LOGIN",
          payload: status
        });
      }
    })
  )(SignForm)
);
