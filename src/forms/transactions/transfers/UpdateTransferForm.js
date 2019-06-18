import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
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
import updateTransaction from "../../../actions/transactions/updateTransaction";
import updateAccount from "../../../actions/accounts/updateAccount";
import patchTransactionRequest from "../../../services/requests/patchTransactionRequest";
import Api from "../../../api/Api";

import successAlert from "../../../actions/successAlert";
import { ErrorModalAlert } from "../ErrorModalAlert";
import { transferValidator } from "./transferValidator";
import {
  errorPointersAndDetails,
  findItem,
  getOptionsForTag,
  transferAttributes
} from "../transactionFormHelpers";

class UpdateTransferForm extends Component {
  static defaultProps = {
    tags: [],
    accounts: [],
    transaction: {}
  };

  initialState = () => {
    const { accounts, transaction } = this.props;
    const from = findItem(
      accounts,
      transaction.relationships.chargeable.data.id
    );
    const to = findItem(accounts, transaction.relationships.profitable.data.id);

    const transactionTags = transaction.relationships.tags.data.map(
      tag => tag.id
    );
    const tagOptions = getOptionsForTag(this.props).filter(tag =>
      transactionTags.includes(tag["value"])
    );

    return {
      validationState: {
        from: null,
        to: null,
        date: null,
        amount: null,
        disableSubmit: false
      },
      transfer: {
        from: from,
        to: to,
        date: new Date(transaction.attributes.date).toISOString().slice(0, 10),
        amount: transaction.attributes.from_amount,
        tag_ids: tagOptions,
        note: transaction.attributes.note
      },
      rate: {
        from: transaction.attributes.from_amount,
        to: transaction.attributes.to_amount
      },
      sameCurrency: from.attributes.currency === to.attributes.currency,
      showErrorAlert: false,
      errorMessages: {
        pointers: [],
        messages: []
      }
    };
  };

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

  handleSubmit = event => {
    event.preventDefault();

    patchTransactionRequest(
      event.target.action,
      transferAttributes(this.state)
    ).then(responce => {
      if (responce.status === 200) {
        this.props.updateTransfer(responce.data);
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
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Update Transfer Operation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            horizontal
            id="updateTransferForm"
            action={Api.transactionPath(
              this.props.transaction.id,
              this.props.transaction.attributes.operation_type
            )}
            method="patch"
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
              transfer={transfer}
            />
            <ToAccount
              validationState={validationState}
              handleChangeAccount={this.handleChangeAccount}
              props={this.props}
              transfer={transfer}
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
            <Note
              handleChangeNote={this.handleChangeNote}
              transfer={transfer}
            />
            <Tags
              handleChangeTags={this.handleChangeTags}
              props={this.props}
              transfer={transfer}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.callback}>Close</Button>
          <Button
            type="submit"
            bsStyle="warning"
            form="updateTransferForm"
            disabled={this.state.validationState.disableSubmit}
          >
            Update
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}

export default connect(
  state => ({
    accounts: state.accounts.accounts,
    tags: state.tags.tags
  }),
  dispatch => ({
    updateTransfer: transfer => {
      dispatch(updateTransaction(transfer.data));
      transfer.included.forEach(item => {
        if (item.type === "accounts") dispatch(updateAccount(item));
      });
      dispatch(
        successAlert(true, "Transfer Transaction was successfully changed")
      );
    }
  })
)(UpdateTransferForm);
