import React, { Component } from "react";
import { connect } from "react-redux";
import showSuccessAlert from "../../actions/successAlert";
import { SuccessAlertComponent } from "../../components/mainPage/SuccessAlertComponent";
import Navbar from "./Navbar";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.showAlert = this.showAlert.bind(this);
  }
  closeSuccessAlert() {
    this.props.handleSignInDismiss(false);
  }
  showAlert() {
    if (this.props.showSuccessAlert) {
      return (
        <SuccessAlertComponent
          closeSuccessAlert={this.closeSuccessAlert.bind(this)}
        />
      );
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        {this.showAlert()}
        <p className="container">This is page for signed in user</p>
      </div>
    );
  }
}

export default connect(
  state => ({
    showSuccessAlert: state.notice.showSuccessAlert,
  }),
  dispatch => ({
    handleSignInDismiss: status => {
      dispatch(showSuccessAlert(status));
    }
  })
)(MainPage);