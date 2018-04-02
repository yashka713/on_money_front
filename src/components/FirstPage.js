import React, { Component } from "react";

import SignForm from "../forms/SignForm";
import { Tabs, Tab } from "react-bootstrap";

class FirstPage extends Component {
  render() {
    return (
      <div className="first-page">
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Sign in">
            <SignForm id="SignIn" action="http://localhost:3000/auth/sign_in" />
          </Tab>
          <Tab eventKey={2} title="Sign up">
            <SignForm id="SignUp" action="http://localhost:3000/auth" />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default FirstPage;
