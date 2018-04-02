import React, { Component } from "react";
import FirstPage from "./FirstPage";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.showAlert = this.showAlert.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }
  closeAlert() {
    this.props.handleDismiss("");
  }

  showAlert() {
    if (this.props.state.show) {
      return (
        <Alert
          bsStyle="danger"
          onDismiss={this.closeAlert}
          bsClass="alert alert-danger alert-dismissable container"
        >
          <strong>{`${this.props.state.status}`}</strong>
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
          <FirstPage />
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
        payload: status
      });
    }
  })
)(App);
