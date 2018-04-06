import React from "react";
import { Alert } from "react-bootstrap";

export const SuccessAlertComponent = props => {
  this.closeAlert = () => {
    props.closeSuccessAlert();
  };
  return (
    <Alert
      bsStyle="success"
      onDismiss={this.closeAlert}
      bsClass="alert alert-success alert-dismissable container"
    >
      <strong>We are glad to see you.</strong>
    </Alert>
  );
};
