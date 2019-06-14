import React, { Component } from "react";
import { Button, Form, Panel } from "react-bootstrap";
import Api from "../../api/Api";
import FieldGroup from "../FieldGroup";
import updateRequest from "../../services/requests/updateRequest";

const PASSW_LENGTH = 6;

export default class ChangePasswordForm extends Component {
  initialState = () => ({
    change_password: {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirmation: ""
    },
    validationState: {
      newPassword: null,
      newPasswordConfirmation: null,
      disableSubmit: true
    }
  });

  state = this.initialState();

  passwordValidation = () => {
    const {
      newPassword,
      newPasswordConfirmation,
      oldPassword
    } = this.state.change_password;

    if (
      oldPassword.length >= PASSW_LENGTH &&
      newPassword.length >= PASSW_LENGTH &&
      newPasswordConfirmation.length >= PASSW_LENGTH &&
      newPassword === newPasswordConfirmation
    ) {
      this.setState({
        validationState: {
          newPassword: "success",
          newPasswordConfirmation: "success",
          disableSubmit: false
        }
      });
    } else {
      this.setState({
        validationState: {
          disableSubmit: true,
          newPassword: "error",
          newPasswordConfirmation: "error"
        }
      });
    }
  };

  handleUpdatePassword = event => {
    event.preventDefault();

    updateRequest(event.target.action, {
      change_password: this.state.change_password
    }).then(responce => {
      if (responce.status === 200) {
        this.props.showModal();
      } else if (responce.status >= 400 || responce.status === 0) {
        this.props.handleShowingError(responce.body);
        console.log("error", responce);
      }
    });
    return false;
  };

  handlePanelClick = event =>
    event.target.getAttribute("aria-expanded") === null
      ? this.setState(this.initialState())
      : null;

  handleChangeAttributes = (event, attribute) =>
    this.setState(
      {
        change_password: {
          ...this.state.change_password,
          [attribute]: event.target.value
        }
      },
      () => this.passwordValidation()
    );

  render() {
    const { change_password, validationState } = this.state;
    return (
      <Panel defaultExpanded={false} className="margin-top-15">
        <Panel.Heading componentClass="div" onClick={this.handlePanelClick}>
          <Panel.Title
            toggle
            componentClass="div"
            className="cursor-pointer panel-title"
          >
            Update Password:
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          <Form
            onSubmit={this.handleUpdatePassword}
            action={Api.passwordsPath()}
          >
            <FieldGroup
              type="password"
              label="Old password"
              placeholder="Enter Old password"
              onChange={e => this.handleChangeAttributes(e, "oldPassword")}
              value={change_password.oldPassword}
            />
            <FieldGroup
              validationState={validationState.newPassword}
              type="password"
              label="New password"
              placeholder="Enter New password"
              onChange={e => this.handleChangeAttributes(e, "newPassword")}
              value={change_password.newPassword}
            />
            <FieldGroup
              validationState={validationState.newPasswordConfirmation}
              type="password"
              label="Confirm New password"
              placeholder="Confirm New password"
              onChange={e =>
                this.handleChangeAttributes(e, "newPasswordConfirmation")
              }
              value={change_password.newPasswordConfirmation}
            />
            <Button
              type="submit"
              bsStyle="primary"
              onClick={e => e.stopPropagation()}
              disabled={validationState.disableSubmit}
            >
              Update Password
            </Button>
          </Form>
        </Panel.Body>
      </Panel>
    );
  }
}
