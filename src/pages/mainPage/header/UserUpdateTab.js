import React, { Component } from "react";

import { errorPointersAndDetails } from "../../../forms/transactions/transactionFormHelpers";
import { ErrorModalAlert } from "../../../forms/transactions/ErrorModalAlert";
import UpdateProfileForm from "../../../forms/profile/UpdateProfileForm";
import ChangePasswordForm from "../../../forms/profile/ChangePasswordForm";

export default class UserUpdateTab extends Component {
  initialState = () => ({
    showErrorAlert: false,
    errorMessages: {
      pointers: [],
      messages: []
    }
  });

  state = this.initialState();

  handleShowingError = (messages = "") => {
    const { pointers, details } = errorPointersAndDetails(messages);
    this.setState({
      showErrorAlert: !this.state.showErrorAlert,
      errorMessages: {
        pointers: [...new Set(pointers)],
        messages: [...new Set(details)]
      }
    });
  };

  render() {
    const { showErrorAlert, errorMessages } = this.state;
    return (
      <div>
        <ErrorModalAlert
          shouldShown={showErrorAlert}
          errors={errorMessages}
          handleDismiss={this.handleShowingError}
        />
        <UpdateProfileForm
          showModal={this.props.showModal}
          handleShowingError={this.handleShowingError}
        />
        <ChangePasswordForm
          showModal={this.props.showModal}
          handleShowingError={this.handleShowingError}
        />
      </div>
    );
  }
}
