import React from "react";

import SignForm from "../../forms/SignForm";
import { Tabs, Tab } from "react-bootstrap";

export const SignTabs = () => {
  return (
    <div className="first-page">
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="Sign in">
          <SignForm id="SignIn" action="https://api-on-money.herokuapp.com/auth/sign_in" />
        </Tab>
        <Tab eventKey={2} title="Sign up">
          <SignForm id="SignUp" action="https://api-on-money.herokuapp.com/auth" />
        </Tab>
      </Tabs>
    </div>
  );
};
