import React, { Component } from "react";
import { Button } from "react-bootstrap";
import FieldGroup from "./FieldGroup";

import "../styles/SignUpForm.css";

class SignUpForm extends Component {
  render() {
    return (
      <div className="SignUp">
        <form
          action="https://api-on-money.herokuapp.com/auth"
          method="post"
          id="sign_up"
          className="SignUpForm"
        >
          <FieldGroup
            id="formControlsEmail"
            type="email"
            label="Email address:"
            placeholder="Enter email"
          />
          <FieldGroup
            id="formControlsPassword"
            label="Password:"
            type="password"
          />
          <Button type="submit" bsStyle="primary">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
