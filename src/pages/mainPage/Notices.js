import React, { Component } from "react";
import { connect } from "react-redux";
import showSuccessAlert from "../../actions/successAlert";
import SuccessAlertComponent from "./SuccessAlertComponent";

class Notices extends Component {
  constructor(props) {
    super(props);
    this.showAlert = this.showAlert.bind(this);
    this.closeSuccessAlert = this.closeSuccessAlert.bind(this);
  }

  closeSuccessAlert() {
    this.props.handleSignInDismiss(false);
  }

  showAlert() {
    if (this.props.showSuccessAlert) {
      return (
        <SuccessAlertComponent closeSuccessAlert={this.closeSuccessAlert} />
      );
    } else {
      return null;
    }
  }

  render() {
    return this.showAlert();
  }
}

export default connect(
  state => ({
    showSuccessAlert: state.notice.showSuccessAlert
  }),
  dispatch => ({
    handleSignInDismiss: status => {
      dispatch(showSuccessAlert(status));
    }
  })
)(Notices);
