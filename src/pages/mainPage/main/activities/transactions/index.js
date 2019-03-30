import { connect } from "react-redux";
import React, { Component } from "react";
import transactionsGetRequest from "../../../../../services/requests/transactionsGetRequest";
import Api from "../../../../../api/Api";
import Timeline from "./Timeline";
import TransactionCalendar from "./TransactionCalendar";
import { TransactionForm } from "./TransactionForm";
import { DateUtils } from "react-day-picker/DayPicker";
import downloadTransactions from "../../../../../actions/transactions/downloadTransactions";

import { ButtonGroup, Button, Modal } from "react-bootstrap";
import "react-day-picker/lib/style.css";

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();

    this.downloadTransactions = this.downloadTransactions.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
  }

  getInitialState() {
    return {
      showModal: false,
      currentPage: 1,
      lastPage: 0,
      fromDay: null,
      toDay: null,
      form: {
        formType: null,
        transaction: {}
      },
      enteredTo: null // Keep track of the last day for mouseEnter.
    };
  }

  isSelectingFirstDay(from, to, day) {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  }

  handleDayClick(day) {
    const { fromDay, toDay } = this.state;
    if (fromDay && toDay && day >= fromDay && day <= toDay) {
      this.resetState();
      return;
    }
    if (this.isSelectingFirstDay(fromDay, toDay, day)) {
      this.setState({
        currentPage: 1,
        fromDay: day,
        toDay: null,
        enteredTo: null
      });
    } else {
      this.setState(
        {
          toDay: day,
          enteredTo: day
        },
        () => {
          const fromDay = this.state.fromDay.toISOString().slice(0, 10);
          const toDay = this.state.toDay.toISOString().slice(0, 10);
          this.downloadTransactions(1, fromDay, toDay);
        }
      );
    }
  }

  handleDayMouseEnter(day) {
    const { fromDay, toDay } = this.state;
    if (!this.isSelectingFirstDay(fromDay, toDay, day)) {
      this.setState({
        enteredTo: day
      });
    }
  }

  resetState() {
    this.setState(this.getInitialState(), () => {
      this.getTransactionsRequest(this.state.currentPage);
    });
  }

  componentDidMount() {
    this.getTransactionsRequest(this.state.currentPage);
  }

  downloadTransactions(pageNumber, from = "", to = "") {
    this.getTransactionsRequest(pageNumber, from, to).then(responce => {
      if (responce.links.next === null) {
        this.setState({
          lastPage: this.state.currentPage
        });
      }
    });
  }

  getTransactionsRequest(pageNumber, from = "", to = "") {
    return transactionsGetRequest(
      Api.transactionsPath(pageNumber, from, to)
    ).then(responce => {
      this.props.downloadTransactions(responce.data);
      return responce;
    });
  }

  handleNextPage() {
    const nextPage = this.state.currentPage + 1;
    let fromDay = "";
    let toDay = "";
    this.setState(
      {
        currentPage: nextPage
      },
      () => {
        if (this.state.fromDay && this.state.toDay) {
          fromDay = this.state.fromDay.toISOString().slice(0, 10);
          toDay = this.state.toDay.toISOString().slice(0, 10);
        }
        this.downloadTransactions(nextPage, fromDay, toDay);
      }
    );
  }

  handlePreviousPage() {
    if (this.state.currentPage >= 1) {
      let fromDay = "";
      let toDay = "";

      const previousPage = this.state.currentPage - 1;
      this.setState(
        {
          currentPage: previousPage
        },
        () => {
          if (this.state.fromDay && this.state.toDay) {
            fromDay = this.state.fromDay.toISOString().slice(0, 10);
            toDay = this.state.toDay.toISOString().slice(0, 10);
          }

          this.downloadTransactions(previousPage, fromDay, toDay);
        }
      );
    }
  }

  handleShowModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  handleNewTransactionType(transactionType, transaction = {}) {
    this.setState(
      {
        ...this.state,
        form: {
          formType: transactionType,
          transaction: transaction
        }
      },
      () => this.handleShowModal()
    );
  }

  updateHandler(transaction) {
    this.handleNewTransactionType(
      transaction.attributes.operation_type,
      transaction
    );
  }

  render() {
    return (
      <div>
        <TransactionCalendar
          fromDay={this.state.fromDay}
          toDay={this.state.toDay}
          enteredTo={this.state.enteredTo}
          handleResetClick={this.resetState}
          handleDayClick={this.handleDayClick}
          handleDayMouseEnter={this.handleDayMouseEnter}
        />
        <div className="transaction-btn-group">
          <ButtonGroup justified>
            <Button
              href="#"
              bsStyle="primary"
              onClick={() => this.handleNewTransactionType("transfer")}
            >
              New Transfer
            </Button>
            <Button
              href="#"
              bsStyle="info"
              onClick={() => this.handleNewTransactionType("profit")}
            >
              New Profit
            </Button>
            <Button
              href="#"
              onClick={() => this.handleNewTransactionType("charge")}
            >
              New Charge
            </Button>
            <Button href="#" bsStyle="warning" onClick={this.resetState}>
              Update transactions
            </Button>
          </ButtonGroup>
          <Modal show={this.state.showModal} onHide={this.handleShowModal}>
            <TransactionForm
              operationType={this.state.form.formType}
              transaction={this.state.form.transaction}
              handleShowModal={this.handleShowModal}
            />
          </Modal>
        </div>
        <Timeline
          updateHandler={this.updateHandler}
          updateTransactions={this.getTransactionsRequest}
          handlePreviousPage={this.handlePreviousPage}
          handleNextPage={this.handleNextPage}
          currentPage={this.state.currentPage}
          lastPage={this.state.lastPage}
        />
      </div>
    );
  }
}

export default connect(null, dispatch => ({
  downloadTransactions: transactions => {
    dispatch(downloadTransactions(transactions));
  }
}))(Transactions);
