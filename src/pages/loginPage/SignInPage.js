import React, { Component } from "react";
import SignInAlerts from "./SignInAlerts";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { SignTabs } from "./SignTabs";

class SignInPage extends Component {
  componentDidMount() {
    this.props.current_user(this.props.isAuthenticated);
  }

  render() {
    return (
      <div>
        <SignInAlerts />
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
    current_user: auth => {
      if (auth) dispatch(push("/"));
    }
  })
)(SignInPage);
