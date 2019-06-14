import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";
import showErrorAlert from "../../actions/signForm/errorAlert";
import showSuccessAlert from "../../actions/signForm/successAlert";

class SignInAlerts extends Component {
  closeErrorAlert = () => this.props.handleErrorDismiss(false);
  closeSuccessAlert = () => this.props.handleSuccessDismiss(false);

  errorsList = () =>
    this.props.notice.errorMessages.map((message, index) => (
      <li key={index}>{message.detail}.</li>
    ));

  render() {
    if (this.props.notice.showSignInErrorAlert) {
      return (
        <Alert
          bsStyle="danger"
          onDismiss={this.closeErrorAlert}
          bsClass="alert alert-danger alert-dismissable allerts"
        >
          <ul>{this.errorsList()}</ul>
        </Alert>
      );
    } else if (this.props.notice.showSignInSuccessAlert) {
      return (
        <Alert
          bsStyle="success"
          onDismiss={this.closeSuccessAlert}
          bsClass="alert alert-success alert-dismissable allerts"
        >
          <p>{this.props.notice.noticeMessage}</p>
        </Alert>
      );
    } else {
      return null;
    }
  }
}

export default connect(
  state => ({
    notice: state.notice
  }),
  dispatch => ({
    handleErrorDismiss: status => {
      dispatch(showErrorAlert(status));
    },
    handleSuccessDismiss: status => {
      dispatch(showSuccessAlert(status));
    }
  })
)(SignInAlerts);
