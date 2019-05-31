import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  ToAccount,
  FromCategory,
  Amount,
  Note,
  Tags,
  DayPicker
} from "./profitFormComponents";
import {
  profitAttributes,
  getOptionsForTag,
  findItem,
  errorPointersAndDetails
} from "../transactionFormHelpers";

import { connect } from "react-redux";
import Api from "../../../api/Api";

import updateAccount from "../../../actions/accounts/updateAccount";
import updateTransaction from "../../../actions/transactions/updateTransaction";
import patchTransactionRequest from "../../../services/requests/patchTransactionRequest";
import successAlert from "../../../actions/successAlert";
import { ErrorModalAlert } from "../ErrorModalAlert";
import { profitValidator } from "./profitValidator";

class UpdateProfitForm extends Component {
  static defaultProps = {
    profits: [],
    tags: [],
    accounts: [],
    transaction: {}
  };

  initialState = () => {
    const { accounts, transaction, profits } = this.props;
    const { relationships } = transaction;
    const from = profits.filter(item => {
      return item.id === relationships.chargeable.data.id;
    })[0];
    const to = findItem(accounts, relationships.profitable.data.id);

    const transactionTags = relationships.tags.data.map(tag => tag.id);
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
      profit: {
        from: from,
        to: to,
        date: new Date(transaction.attributes.date).toISOString().slice(0, 10),
        amount: transaction.attributes.from_amount,
        tag_ids: tagOptions,
        note: transaction.attributes.note
      },
      showErrorAlert: false,
      errorMessages: {
        pointers: [],
        messages: []
      }
    };
  };

  state = this.initialState();

  handleChangeAccount = event => {
    const item = this.props.accounts.filter(item => {
      return item.id === event.target.value;
    })[0];
    this.setState(
      {
        profit: {
          ...this.state.profit,
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

  handleChangeCategory = event => {
    const item = this.props.profits.filter(item => {
      return item.id === event.target.value;
    })[0];
    this.setState(
      {
        profit: {
          ...this.state.profit,
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

  handleDayChange = day =>
    this.setState(
      {
        profit: {
          ...this.state.profit,
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
        profit: {
          ...this.state.profit,
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
      profit: {
        ...this.state.profit,
        note: event.target.value
      }
    });

  formValidation = () =>
    this.setState(
      profitValidator(this.state.profit, this.state.validationState)
    );

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
      profit: {
        ...this.state.profit,
        tag_ids: selectedOption
      }
    });

  handleSubmit = event => {
    event.preventDefault();

    patchTransactionRequest(
      event.target.action,
      profitAttributes(this.state)
    ).then(responce => {
      if (responce.status === 200) {
        this.props.updateProfit(responce.data);
        this.props.callback();
      } else {
        this.handleShowingError(responce.body);
        console.log("error", responce);
      }
    });
    return false;
  };

  render() {
    const {
      profit,
      validationState,
      showErrorAlert,
      errorMessages
    } = this.state;
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Update Profit Operation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            horizontal
            id="updateProfitForm"
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
            <FromCategory
              validationState={validationState}
              handleChangeCategory={this.handleChangeCategory}
              props={this.props}
              profit={profit}
            />
            <ToAccount
              validationState={validationState}
              handleChangeAccount={this.handleChangeAccount}
              props={this.props}
              profit={profit}
            />
            <DayPicker
              validationState={validationState}
              handleDayChange={this.handleDayChange}
              profit={profit}
            />
            <Amount
              validationState={validationState}
              handleChangeAmount={this.handleChangeAmount}
              profit={profit}
            />
            <Note handleChangeNote={this.handleChangeNote} profit={profit} />
            <Tags
              handleChangeTags={this.handleChangeTags}
              props={this.props}
              profit={profit}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.callback}>Close</Button>
          <Button
            type="submit"
            bsStyle="warning"
            form="updateProfitForm"
            disabled={validationState.disableSubmit}
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
    profits: state.categories.categories.profit,
    tags: state.tags.tags
  }),
  dispatch => ({
    updateProfit: profit => {
      dispatch(updateTransaction(profit.data));
      profit.included.forEach(item => {
        if (item.type === "accounts") dispatch(updateAccount(item));
      });
      dispatch(
        successAlert(true, "Profit Transaction was successfully changed")
      );
    }
  })
)(UpdateProfitForm);
