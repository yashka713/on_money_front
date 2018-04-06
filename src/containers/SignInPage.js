import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { SignTabs } from "../components/SignTabs";
import showErrorAlert from "../actions/signForm/errorAlert";

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.showAlert = this.showAlert.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }
  componentWillMount() {
    this.props.current_user(this.props.isAuthenticated);
  }

  closeAlert() {
    this.props.handleDismiss(false);
  }

  showAlert() {
    if (this.props.notice.showSignInAlert) {
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
    notice: state.notice,
    isAuthenticated: state.auth.isAuthenticated
  }),
  dispatch => ({
    handleDismiss: status => {
      dispatch(showErrorAlert(status));
    },
    current_user: auth => {
      if (auth) dispatch(push("/"));
    }
  })
)(SignInPage);
