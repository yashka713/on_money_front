import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import userLogout from "../../../actions/logout";

class LogoutComponent extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    this.props.logoutUser();
  }
  render() {
    return (
      <span className="center-block" onClick={this.logout}>
        Logout
      </span>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    logoutUser: () => {
      dispatch(userLogout());
      dispatch(push("/login"));
    }
  })
)(LogoutComponent);
