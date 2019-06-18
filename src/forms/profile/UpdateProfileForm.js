import React, { Component } from "react";
import { connect } from "react-redux";
import userLogout from "../../actions/logout";
import { push } from "react-router-redux";
import updateProfile from "../../actions/updateProfile";
import updateProfileRequest from "../../services/requests/updateProfileRequest";
import { Button, Form, Panel } from "react-bootstrap";
import Api from "../../api/Api";
import FieldGroup from "../FieldGroup";

class UpdateProfileForm extends Component {
  initialState = () => ({
    profile: {
      name: this.props.current_user.name,
      nickname: this.props.current_user.nickname
    }
  });

  state = this.initialState();

  handleChangeAttributes = (event, attribute) =>
    this.setState({
      profile: {
        ...this.state.profile,
        [attribute]: event.target.value
      }
    });

  handleUpdateProfile = event => {
    event.preventDefault();

    updateProfileRequest(event.target.action, this.state.profile).then(
      responce => {
        if (responce.status === 200) {
          this.props.updateProfile(responce.current_user);
          this.props.showModal();
        } else if (responce.status >= 400 || responce.status === 0) {
          this.props.handleShowingError(responce.body);
          console.log("error", responce);
        }
      }
    );
    return false;
  };

  render() {
    const { name, nickname } = this.state.profile;
    return (
      <Panel>
        <Panel.Heading componentClass="div">
          <Panel.Title>User data:</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Form onSubmit={this.handleUpdateProfile} action={Api.profilesPath()}>
            <FieldGroup
              type="text"
              label="User Name"
              placeholder="Enter User Name"
              onChange={e => this.handleChangeAttributes(e, "name")}
              value={name}
            />
            <FieldGroup
              type="text"
              label="User Nickname"
              placeholder="Enter User Nickname"
              onChange={e => this.handleChangeAttributes(e, "nickname")}
              value={nickname}
            />
            <Button
              type="submit"
              bsStyle="primary"
              onClick={e => e.stopPropagation()}
            >
              Update Profile
            </Button>
          </Form>
        </Panel.Body>
      </Panel>
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
)(UpdateProfileForm);
