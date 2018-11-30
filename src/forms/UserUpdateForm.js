import React, { Component } from "react";
import FieldGroup from "./FieldGroup";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import Api from "../api/Api";
import { push } from "react-router-redux";

import updateProfileRequest from "../services/requests/updateProfileRequest";

import updateProfile from "../actions/updateProfile";
import userLogout from "../actions/logout";

class UserUpdateForm extends Component {
  constructor(props) {
    super(props);

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeNickname = this.handleChangeNickname.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);

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

  handleUpdateProfile(event) {
    event.preventDefault();
    const url = event.target.action;

    updateProfileRequest(url, this.state).then(responce => {
      if (responce.status === 200) {
        this.props.updateProfile(responce.current_user);
        this.props.showModal();
      } else if (responce.status >= 400 || responce.status === 0) {
        this.props.logoutUser();
      }
    });
    return false;
  }

  render() {
    return (
      <div>
        <form
          name="UserUpdateProfile"
          onSubmit={this.handleUpdateProfile}
          action={Api.profilesPath()}
          id="UserUpdateForm"
        >
          <FieldGroup
            id="userName"
            type="text"
            label="User Name"
            placeholder="Enter User Name"
            onChange={this.handleChangeName}
            value={this.state.name}
          />
          <FieldGroup
            id="nickname"
            type="text"
            label="User Nickname"
            placeholder="Enter User Nickname"
            onChange={this.handleChangeNickname}
            value={this.state.nickname}
          />
          <Button
            type="submit"
            bsStyle="primary"
            onClick={e => e.stopPropagation()}
          >
            Update
          </Button>
        </form>
      </div>
    );
  }
}

export default connect(
  state => ({
    current_user: state.current_user
  }),
  dispatch => ({
    logoutUser: () => {
      dispatch(userLogout());
      dispatch(push("/login"));
    },
    updateProfile: user => {
      dispatch(updateProfile(user));
    }
  })
)(UserUpdateForm);
