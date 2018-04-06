import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Route } from "react-router";
import { push } from "react-router-redux";
import successAuth from "../actions/successAuth";

class PrivateRoute extends Component {
  render() {
    const { isAuthenticated, component: Component, ...props } = this.props;
    return (
      <Route
        {...props}
        render={props => {
          return isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        }}
      />
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated
  }),
  dispatch => ({
    login: () => {
      dispatch(successAuth());
      dispatch(push("/"));
    }
  })
)(PrivateRoute);
