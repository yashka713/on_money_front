import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Route } from "react-router";
import MainPage from "./mainPage/MainPage";

class ProtectedRoute extends Component {
  render() {
    let content;

    if (this.props.isAuthenticated) {
      content = <Route path="/" component={MainPage} />;
    } else {
      content = <Redirect push to="/login" />;
    }
    return content;
  }
}

export default connect(state => ({
  isAuthenticated: state.current_user.isAuthenticated
}))(ProtectedRoute);
