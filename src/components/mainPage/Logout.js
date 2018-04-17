import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import userLogout from "../../actions/logout";
import Token from "../../utils/session/localStorageProvider";

class LogoutComponent extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    this.props.logoutUser();
    Token.clearLS();
  }
  render() {
    return <div onClick={this.logout}>Logout</div>;
  }
}

export default connect(null, dispatch => ({
  logoutUser: () => {
    dispatch(userLogout());
    dispatch(push("/login"));
  }
}))(LogoutComponent);
