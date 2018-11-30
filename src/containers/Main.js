import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { push } from "react-router-redux";
import { checkUserRequest } from "../services/requests/checkUserRequest";
import ProtectedRoute from "./ProtectedRoute";
import MainPage from "./mainPage/MainPage";
import successAuth from "../actions/successAuth";
import showErrorAlert from "../actions/signForm/errorAlert";

class Main extends Component {
  componentWillMount() {
    checkUserRequest().then(response => {
      if (response.status === 200) {
        this.props.currentUser(response.current_user);
      } else {
        this.props.handleError(response);
      }
    });
  }

  render() {
    return <ProtectedRoute path="/" component={MainPage} />;
  }
}

export default connect(null, dispatch => ({
  handleError: response => {
    dispatch(showErrorAlert(response));
  },
  currentUser: user => {
    dispatch(successAuth(user));
    dispatch(push("/"));
  }
}))(Main);
