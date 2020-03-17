import React, { Component, Fragment } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  transferAttributes,
  findItem,
  errorPointersAndDetails
} from "../transactionFormHelpers";
import {
  FromAccount,
  ToAccount,
  Amount,
  DayPicker,
  Tags,
  DiffAmount,
  Note
} from "./transferFormComponents";

import { connect } from "react-redux";
import newTransaction from "../../../actions/transactions/newTransaction";
import updateAccount from "../../../actions/accounts/updateAccount";
import successAlert from "../../../actions/successAlert";
import newTransactionRequest from "../../../services/requests/newTransactionRequest";
import Api from "../../../api/Api";

import { ErrorModalAlert } from "../ErrorModalAlert";
import { transferValidator } from "./transferValidator";
import { FileUploaderComponent } from "../fileUploaderComponent";

class NewTransferForm extends Component {
  static defaultProps = {
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
    transfer: {
      from: null,
      to: null,
      date: new Date().toISOString().slice(0, 10),
      amount: null,
      tag_ids: [],
      note: "",
      file: null
    },
    rate: {
      from: 0,
      to: 0
    },
    sameCurrency: true,
    showErrorAlert: false,
    errorMessages: {
      pointers: [],
      messages: []
    }
  });

  state = this.initialState();

  handleChangeAccount = (event, account) => {
    const item = findItem(this.props.accounts, event.target.value);
    this.setState(
      {
        transfer: {
          ...this.state.transfer,
          [account]: item
        },
        validationState: {
          ...this.state.validationState,
          [account]: item ? null : "error"
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
        transfer: {
          ...this.state.transfer,
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
        transfer: {
          ...this.state.transfer,
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
      transfer: {
        ...this.state.transfer,
        note: event.target.value
      }
    });

  handleChangeRateFrom = event => {
    const rateFrom = event.target.value;
    const rateTo = this.state.rate.to;

    this.setState(
      {
        transfer: {
          ...this.state.transfer,
          amount: rateFrom && rateTo && rateTo !== 0 ? rateFrom : null
        },
        rate: {
          ...this.state.rate,
          from: rateFrom
        },
        validationState: {
          ...this.state.validationState,
          amount: rateFrom && rateFrom !== 0 ? null : "error"
        }
      },
      () => {
        this.formValidation();
      }
    );
  };

  handleChangeRateTo = event => {
    const rateTo = event.target.value;
    const rateFrom = this.state.rate.from;

    this.setState(
      {
        transfer: {
          ...this.state.transfer,
          amount:
            rateFrom && rateTo && rateTo !== 0 && rateFrom !== 0
              ? rateFrom
              : null
        },
        rate: {
          ...this.state.rate,
          to: rateTo
        },
        validationState: {
          ...this.state.validationState,
          amount: rateTo && rateTo !== 0 ? null : "error"
        }
      },
      () => {
        this.formValidation();
      }
    );
  };

  formValidation = () =>
    this.setState(
      transferValidator(this.state.transfer, this.state.validationState)
    );

  handleChangeFile = event =>
    this.setState({
      transfer: {
        ...this.state.transfer,
        file: event.target.files[0]
      }
    });

  handleSubmit = event => {
    event.preventDefault();

    newTransactionRequest(
      event.target.action,
      transferAttributes(this.state)
    ).then(responce => {
      if (responce.status === 201) {
        this.props.newTransfer(responce.data);
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
      transfer: {
        ...this.state.transfer,
        tag_ids: selectedOption
      }
    });

  render() {
    const {
      transfer,
      validationState,
      showErrorAlert,
      sameCurrency,
      errorMessages
    } = this.state;
    return (
      <Fragment>
        <Modal.Header closeButton>
          <Modal.Title>New Transfer Operation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            horizontal
            id="newTransferForm"
            action={Api.transfersPath()}
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
            <ToAccount
              validationState={validationState}
              handleChangeAccount={this.handleChangeAccount}
              props={this.props}
            />
            <DayPicker
              validationState={validationState}
              handleDayChange={this.handleDayChange}
              transfer={transfer}
            />
            {sameCurrency ? (
              <Amount
                validationState={validationState}
                handleChangeAmount={this.handleChangeAmount}
                transfer={transfer}
              />
            ) : (
              <DiffAmount
                validationState={validationState}
                handleChangeRateFrom={this.handleChangeRateFrom}
                handleChangeRateTo={this.handleChangeRateTo}
                transfer={transfer}
              />
            )}
            <Note handleChangeNote={this.handleChangeNote} />
            <Tags handleChangeTags={this.handleChangeTags} props={this.props} />
            <FileUploaderComponent
              handleChangeFile={this.handleChangeFile}
              file={transfer.file}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.callback}>Close</Button>
          <Button
            type="submit"
            bsStyle="primary"
            form="newTransferForm"
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
    tags: state.tags.tags
  }),
  dispatch => ({
    newTransfer: transfer => {
      dispatch(newTransaction(transfer.data));
      transfer.included.forEach(item => {
        if (item.type === "accounts") dispatch(updateAccount(item));
      });
      dispatch(successAlert(true, "New Transfer Transaction was created"));
    }
  })
)(NewTransferForm);
