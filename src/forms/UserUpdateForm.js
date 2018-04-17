import React, { Component } from "react";
import { Button, Alert } from "react-bootstrap";
import FieldGroup from "./FieldGroup";
import { connect } from "react-redux";

import userUpdate from "../utils/userUpdate/userUpdate";
import updateUser from "../actions/updateUser";

class UserUpdateForm extends Component {
  constructor(props) {
    super(props);

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeNickname = this.handleChangeNickname.bind(this);
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.handleDismissAlert = this.handleDismissAlert.bind(this);
    this.state = {
      name: this.props.current_user.name,
      nickname: this.props.current_user.nickname,
      showAlert: false,
      alertType: "success"
    };
  }

  handleChangeName(event) {
    this.setState({
      name: event.target.value
    });
  }
  handleChangeNickname(event) {
    this.setState({
      nickname: event.target.value
    });
  }
  handleDismissAlert() {
    this.setState({
      showAlert: false
    });
  }
  handleAlert() {
    if (this.state.showAlert) {
      let text = "";
      if (this.state.alertType === "success") {
        text = "Success";
      } else {
        text = "Oh snap! You got an error";
      }
      return <Alert bsStyle={this.state.alertType} onDismiss={this.handleDismissAlert}><h4>{text}</h4></Alert>;
    }
  }

  handleUserUpdate(event) {
    event.preventDefault();
    const answer = userUpdate(this.state);
    answer
      .then(result => {
        console.log(result);
        if (result.status >= 200 && result.status < 300) {
          this.props.update(result.current_user);
          this.setState({ alertType: "success" });
        }
      })
      .catch(e => {
        this.setState({ alertType: "danger" });
      });
    this.setState({ showAlert: true });
    return false;
  }
  render() {
    return (
      <form onSubmit={this.handleUserUpdate} id="UserUpdateForm">
        {this.handleAlert()}
        <FieldGroup
          id="UserUpdateName"
          type="text"
          label="User Name"
          placeholder="Enter User Name"
          onChange={this.handleChangeName}
          value={this.state.name}
        />
        <FieldGroup
          id="UserUpdateNickname"
          type="text"
          value={this.state.nickname}
          label="User Nickname"
          placeholder="Enter User Nickname"
          onChange={this.handleChangeNickname}
        />
        <Button type="submit" form="UserUpdateForm" bsStyle="success">
          Update
        </Button>
      </form>
    );
  }
}

export default connect(
  state => ({
    current_user: state.current_user
  }),
  dispatch => ({
    update: user => {
      dispatch(updateUser(user));
    }
  })
)(UserUpdateForm);
