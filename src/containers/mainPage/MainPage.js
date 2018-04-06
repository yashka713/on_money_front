import React, { Component } from "react";
import { connect } from "react-redux";
import showSuccessAlert from "../../actions/successAlert";
import { HeaderComponent } from "../../components/HeaderComponent";
import { SuccessAlertComponent } from "../../components/SuccessAlertComponent";

class MainPage extends Component {
  constructor(props) {
    super(props);
    // this.closeSuccessAlert = this.closeSuccessAlert.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }
  closeSuccessAlert() {
    this.props.handleSignInDismiss(false);
  }
  showAlert() {
    if (this.props.showSuccessAlert) {
      return (<SuccessAlertComponent closeSuccessAlert={this.closeSuccessAlert.bind(this)} />);
    }
  }
  render() {
    return (
      <div>
        <HeaderComponent />
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
      dispatch(showSuccessAlert(status));
    }
  })
)(MainPage);
