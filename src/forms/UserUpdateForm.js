import React, { Component } from "react";
import FieldGroup from "./FieldGroup";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";

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
      <Form
        onSubmit={this.handleUserUpdate}
        action={this.props.action}
        method="patch"
        id={this.props.id}
      >
        <FieldGroup
          role="form"
          id={`${this.props.id}Name`}
          type="text"
          label="User Name"
          placeholder="Enter User Name"
          onChange={this.handleChangeName}
          value={this.state.name}
        />
        <FieldGroup
          role="form"
          id={`${this.props.id}Nickname`}
          type="text"
          label="User Nickname"
          placeholder="Enter User Nickname"
          onChange={this.handleChangeNickname}
          value={this.state.nickname}
        />
        <Button className="btn btn-primary btn-large centerButton" type="submit">Send</Button>
      </Form>
    );
  }
}

export default connect(state => ({
  current_user: state.current_user
}))(UserUpdateForm);
