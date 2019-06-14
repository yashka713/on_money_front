import React, { Component } from "react";
import { connect } from "react-redux";
import showSuccessAlert from "../../actions/successAlert";
import HeaderComponent from "./header/HeaderComponent";
import { Body } from "./main";
import Notices from "./Notices";

class MainPage extends Component {
  render() {
    return (
      <div className="main-page">
        <HeaderComponent />
        <Notices />
        <Body />
      </div>
    );
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
)(MainPage);
