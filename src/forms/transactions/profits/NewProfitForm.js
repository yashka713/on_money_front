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
  errorPointersAndDetails
} from "../transactionFormHelpers";

import { connect } from "react-redux";
import Api from "../../../api/Api";
import newTransactionRequest from "../../../services/requests/newTransactionRequest";

import newTransaction from "../../../actions/transactions/newTransaction";
import updateAccount from "../../../actions/accounts/updateAccount";
import successAlert from "../../../actions/successAlert";
import { ErrorModalAlert } from "../ErrorModalAlert";
import { profitValidator } from "./profitValidator";

class NewProfitForm extends Component {
  static defaultProps = {
    profits: [],
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
    profit: {
      from: null,
      to: null,
      date: new Date().toISOString().slice(0, 10),
      amount: null,
      tag_ids: [],
      note: ""
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

  handleSubmit = event => {
    event.preventDefault();
    newTransactionRequest(
      event.target.action,
      profitAttributes(this.state)
    ).then(responce => {
      if (responce.status === 201) {
        console.log(responce.data)
        this.props.newProfit(responce.data);
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
      profit: {
        ...this.state.profit,
        tag_ids: selectedOption
      }
    });

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
          <Modal.Title>New Profit Operation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            horizontal
            id="newProfitForm"
            action={Api.profitsPath()}
            method="post"
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
            />
            <ToAccount
              validationState={validationState}
              handleChangeAccount={this.handleChangeAccount}
              props={this.props}
            />
            <DayPicker
              validationState={validationState}
              handleDayChange={this.handleDayChange}
              profit={profit}
            />
            <Amount
              validationState={validationState}
              handleChangeAmount={this.handleChangeAmount}
            />
            <Note handleChangeNote={this.handleChangeNote} />
            <Tags handleChangeTags={this.handleChangeTags} props={this.props} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.callback}>Close</Button>
          <Button
            type="submit"
            bsStyle="primary"
            form="newProfitForm"
            disabled={validationState.disableSubmit}
          >
            Create
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
    newProfit: profit => {
      dispatch(newTransaction(profit.data));
      profit.included.forEach(item => {
        if (item.type === "accounts") dispatch(updateAccount(item));
      });
      dispatch(successAlert(true, "New Profit Transaction was created"));
    }
  })
)(NewProfitForm);
