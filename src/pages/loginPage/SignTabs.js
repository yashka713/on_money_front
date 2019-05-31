import React from "react";
import Api from "../../api/Api";
import SignForm from "../../forms/SignForm";
import { Support } from "./Support";
import { Tabs, Tab } from "react-bootstrap";

export const SignTabs = () => {
  return (
    <div className="first-page">
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="Sign in">
          <SignForm id="SignIn" action={Api.startSessionPath()} />
        </Tab>
        <Tab eventKey={2} title="Sign up">
          <SignForm id="SignUp" action={Api.registerUserPath()} />
        </Tab>
        <Tab eventKey={3} title="Need support?">
          <Support id="Support" />
        </Tab>
      </Tabs>
    </div>
  );
};
