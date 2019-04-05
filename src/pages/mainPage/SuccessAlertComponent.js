import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";

class SuccessAlertComponent extends Component {
  render() {
    setTimeout(this.props.closeSuccessAlert, 3000);
    return (
      <Alert
        bsStyle="success"
        onDismiss={() => this.props.closeSuccessAlert()}
        bsClass="alert alert-success alert-dismissable allerts"
      >
        <strong>{this.props.noticeMessage}</strong>
      </Alert>
    );
  }
}

export default connect(
  state => ({
    noticeMessage: state.notice.noticeMessage
  }),
  null
)(SuccessAlertComponent);
