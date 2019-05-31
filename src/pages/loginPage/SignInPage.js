import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { SignTabs } from "./SignTabs";
import showErrorAlert from "../../actions/signForm/errorAlert";

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.showAlert = this.showAlert.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }
  componentDidMount() {
    this.props.current_user(this.props.isAuthenticated);
  }

  closeAlert() {
    this.props.handleDismiss(false);
  }

  showAlert() {
    if (this.props.notice.showSignInAlert) {
      let errorsList = this.props.notice.errorMessages.map((message, index) => {
        return <li key={index}>{message.detail}.</li>;
      });
      setTimeout(this.closeAlert.bind(this), 3000);
      return (
        <Alert
          bsStyle="danger"
          onDismiss={this.closeAlert}
          bsClass="alert alert-danger alert-dismissable allerts"
        >
          <ul>{errorsList}</ul>
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
    isAuthenticated: state.current_user.isAuthenticated
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
