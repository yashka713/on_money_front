import React, { Component } from "react";
import SignTabs from "./SignTabs";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";
// import checkUser from "../utils/checkUser";

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.showAlert = this.showAlert.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    // this.findUser = this.findUser.bind(this);
  }
  closeAlert() {
    this.props.handleDismiss("");
  }
  // findUser() {
  //   checkUser();
  // }

  showAlert() {
    if (this.props.state.show) {
      return (
        <Alert
          bsStyle="danger"
          onDismiss={this.closeAlert}
          bsClass="alert alert-danger alert-dismissable container"
        >
          <strong>Something going wrong, please, check the fields.</strong>
        </Alert>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        {this.showAlert()}
        <div className="App">
          <SignTabs />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    state: state.notice
  }),
  dispatch => ({
    handleDismiss: status => {
      dispatch({
        type: "SHOW_ALERT",
        payload: false
      });
    }
  })
)(SignInPage);
