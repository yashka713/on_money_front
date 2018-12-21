import React from "react";
import { Alert } from "react-bootstrap";

export const SuccessAlertComponent = props => {
  this.closeAlert = () => {
    props.closeSuccessAlert();
  };
  setTimeout(this.closeAlert.bind(this), 3000);
  return (
    <Alert
      bsStyle="success"
      onDismiss={this.closeAlert}
      bsClass="alert alert-success alert-dismissable allerts"
    >
      <strong>We are glad to see you.</strong>
    </Alert>
  );
};
