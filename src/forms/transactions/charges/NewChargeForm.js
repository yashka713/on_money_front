import React, { Component, Fragment } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  chargeAttributes,
  errorPointersAndDetails
} from "../transactionFormHelpers";
import {
  FromAccount,
  ToCategory,
  Amount,
  Note,
  Tags,
  DayPicker
} from "./chargeFormComponents";

import { chargeValidator } from "./chargeValidator";
import { ErrorModalAlert } from "../ErrorModalAlert";

import { connect } from "react-redux";
import Api from "../../../api/Api";
import newTransactionRequest from "../../../services/requests/newTransactionRequest";

import newTransaction from "../../../actions/transactions/newTransaction";
import updateAccount from "../../../actions/accounts/updateAccount";
import successAlert from "../../../actions/successAlert";
import { FileUploaderComponent } from "../fileUploaderComponent";

class NewChargeForm extends Component {
  static defaultProps = {
    charges: [],
    tags: [],
    accounts: []
  };

  initialState = () => ({
    validationState: {
      from: null,
      to: null,
      date: null,
      amount: null,
      disableSubmit: true
    },
    charge: {
      from: null,
      to: null,
      date: new Date().toISOString().slice(0, 10),
      amount: null,
      tag_ids: [],
      note: "",
      file: null
    },
    showErrorAlert: false,
    errorMessages: {
      pointers: [],
      messages: []
    }
  });

  state = this.initialState();

  handleChangeAccount = event => {
    const item = this.props.accounts.filter(item => {
      return item.id === event.target.value;
    })[0];
    this.setState(
      {
        charge: {
          ...this.state.charge,
          from: item
        },
        validationState: {
          ...this.state.validationState,
          from: item ? null : "error"
        }
      },
      () => {
        this.formValidation();
      }
    );
  };

  handleChangeCategory = event => {
    const item = this.props.charges.filter(item => {
      return item.id === event.target.value;
    })[0];
    this.setState(
      {
        charge: {
          ...this.state.charge,
          to: item
        },
        validationState: {
          ...this.state.validationState,
          to: item ? null : "error"
        }
      },
      () => {
        this.formValidation();
      }
    );
  };

  handleDayChange = day =>
    this.setState(
      {
        charge: {
          ...this.state.charge,
          date: day ? new Date(day).toISOString().slice(0, 10) : ""
        },
        validationState: {
          ...this.state.validationState,
          date: day ? null : "error"
        }
      },
      () => {
        this.formValidation();
      }
    );

  handleChangeAmount = event => {
    const amount = event.target.value;
    this.setState(
      {
        charge: {
          ...this.state.charge,
          amount: amount
        },
        validationState: {
          ...this.state.validationState,
          amount: amount ? null : "error"
        }
      },
      () => {
        this.formValidation();
      }
    );
  };

  handleChangeNote = event =>
    this.setState({
      charge: {
        ...this.state.charge,
        note: event.target.value
      }
    });

  formValidation = () =>
    this.setState(
      chargeValidator(this.state.charge, this.state.validationState)
    );

  handleChangeFile = event =>
    this.setState({
      charge: {
        ...this.state.charge,
        file: event.target.files[0]
      }
    });

  handleSubmit = event => {
    event.preventDefault();

    newTransactionRequest(
      event.target.action,
      chargeAttributes(this.state)
    ).then(responce => {
      if (responce.status === 201) {
        this.props.newCharge(responce.data);
        this.props.callback();
      } else {
        this.handleShowingError(responce.body);
        console.log("error", responce);
      }
    });
    return false;
  };

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

  handleChangeTags = selectedOption =>
    this.setState({
      charge: {
        ...this.state.charge,
        tag_ids: selectedOption
      }
    });

  render() {
    const {
      charge,
      validationState,
      showErrorAlert,
      errorMessages
    } = this.state;
    return (
      <Fragment>
        <Modal.Header closeButton>
          <Modal.Title>New Charge Operation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            horizontal
            id="newChargeForm"
            action={Api.chargesPath()}
            method="post"
            onSubmit={this.handleSubmit}
          >
            <ErrorModalAlert
              shouldShown={showErrorAlert}
              errors={errorMessages}
              handleDismiss={this.handleShowingError}
            />
            <FromAccount
              validationState={validationState}
              handleChangeAccount={this.handleChangeAccount}
              props={this.props}
            />
            <ToCategory
              validationState={validationState}
              handleChangeCategory={this.handleChangeCategory}
              props={this.props}
            />
            <DayPicker
              validationState={validationState}
              handleDayChange={this.handleDayChange}
              charge={charge}
            />
            <Amount
              validationState={validationState}
              handleChangeAmount={this.handleChangeAmount}
            />
            <Note handleChangeNote={this.handleChangeNote} />
            <Tags handleChangeTags={this.handleChangeTags} props={this.props} />
            <FileUploaderComponent
              handleChangeFile={this.handleChangeFile}
              props={this.props}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.callback}>Close</Button>
          <Button
            type="submit"
            bsStyle="primary"
            form="newChargeForm"
            disabled={validationState.disableSubmit}
          >
            Create
          </Button>
        </Modal.Footer>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    accounts: state.accounts.accounts,
    charges: state.categories.categories.charge,
    tags: state.tags.tags
  }),
  dispatch => ({
    newCharge: charge => {
      dispatch(newTransaction(charge.data));
      charge.included.forEach(item => {
        if (item.type === "accounts") dispatch(updateAccount(item));
      });
      dispatch(successAlert(true, "New Charge Transaction was created"));
    }
  })
)(NewChargeForm);
