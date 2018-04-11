import React, { Component } from "react";
import FieldGroup from "./FieldGroup";
import { connect } from "react-redux";

class UserUpdateForm extends Component {
  constructor(props) {
    super(props);

    this.handleUserUpdate = this.handleUserUpdate.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeNickname = this.handleChangeNickname.bind(this);
    this.state = {
      name: this.props.current_user.name,
      nickname: this.props.current_user.nickname
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

  handleUserUpdate(event) {
    event.preventDefault();
    const url = event.target.action;
    console.log(url);
    return false;
  }
  render() {
    return (
      <form
        onSubmit={this.handleUserUpdate}
        action={this.props.action}
        method="patch"
        id={this.props.id}
      >
        <FieldGroup
          id={`${this.props.id}Name`}
          type="text"
          label="User Name"
          required
          placeholder="Enter User Name"
          onChange={this.handleChangeName}
          value={this.state.name}
        />
        <FieldGroup
          id={`${this.props.id}Nickname`}
          type="text"
          label="User Nickname"
          required
          placeholder="Enter User Nickname"
          onChange={this.handleChangeNickname}
          value={this.state.nickname}
        />
        <input type="submit" value="Update" />
      </form>
    );
  }
}

export default connect(state => ({
  current_user: state.current_user
}))(UserUpdateForm);
