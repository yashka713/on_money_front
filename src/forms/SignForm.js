import React, { Component } from "react";
import { Button } from "react-bootstrap";
import FieldGroup from "./FieldGroup";
// utils
import UserSessionUtils from "../utils/UserSessionUtils";

import "../styles/Form.css";

class SignForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.type]: event.target.value
    });
  }

  handleSubmit(event) {
    const url = event.target.action;
    const session = new UserSessionUtils();
    session.postRequest(url, this.state);
    event.preventDefault();
    return false;
  }

  render() {
    return (
      <div>
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
            onChange={this.handleChange}
          />
          <FieldGroup
            id={`${this.props.id}Password`}
            label="Password:"
            type="password"
            placeholder="password"
            onChange={this.handleChange}
          />
          <Button type="submit" bsStyle="primary">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default SignForm;
