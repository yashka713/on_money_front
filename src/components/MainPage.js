import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.closeSuccsesAlert = this.closeSuccsesAlert.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }
  closeSuccsesAlert() {
    this.props.handleSignInDismiss(false);
  }
  showAlert() {
    if (this.props.showSuccessAlert) {
      return (
        <Alert
          bsStyle="success"
          onDismiss={this.closeSuccsesAlert}
          bsClass="alert alert-success alert-dismissable container"
        >
          <strong>We are glad to see you.</strong>
        </Alert>
      );
    }
  }
  render() {
    return (
      <div className="MainPage">
        {this.showAlert()}
        <p>This is page for signed in user</p>
      </div>
    );
  }
}

export default connect(
  state => ({
    showSuccessAlert: state.auth.showSuccessAlert
  }),
  dispatch => ({
    handleSignInDismiss: status => {
      dispatch({
        type: "SHOW_SUCCESS_ALERT",
        payload: status
      });
    }
  })
)(MainPage);
