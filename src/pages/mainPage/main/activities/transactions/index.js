import { connect } from "react-redux";
import React, { Component } from "react";
import transactionsGetRequest from "../../../../../services/requests/transactionsGetRequest";
import Api from "../../../../../api/Api";
import Timeline from "./Timeline";
import TransactionCalendar from "./TransactionCalendar";
import { DateUtils } from "react-day-picker/DayPicker";
import downloadTransactions from "../../../../../actions/transactions/downloadTransactions";

import { ButtonGroup, Button, Modal } from "react-bootstrap";
import "react-day-picker/lib/style.css";

import NewTransferForm from "../../../../../forms/transactions/transfers/NewTransferForm";
import NewProfitForm from "../../../../../forms/transactions/profits/NewProfitForm";
import NewChargeForm from "../../../../../forms/transactions/charges/NewChargeForm";

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
    this.handleNewTransfer = this.handleNewTransfer.bind(this);
    this.handleNewProfit = this.handleNewProfit.bind(this);
    this.handleNewCharge = this.handleNewCharge.bind(this);
    this.whichForm = this.whichForm.bind(this);
  }

  getInitialState() {
    return {
      showModal: false,
      currentPage: 1,
      lastPage: 0,
      fromDay: null,
      toDay: null,
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
    this.setState({
      showModal: false,
      currentPage: 1,
      lastPage: 0,
      whichForm: null
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

  handleNewTransfer() {
    this.setState({
      whichForm: "NewTransferForm"
    });
    this.handleShowModal();
  }

  handleNewProfit() {
    this.setState({
      whichForm: "NewProfitForm"
    });
    this.handleShowModal();
  }

  handleNewCharge() {
    this.setState({
      whichForm: "NewChargeForm"
    });
    this.handleShowModal();
  }

  whichForm() {
    switch (this.state.whichForm) {
      case "NewTransferForm":
        return <NewTransferForm callback={this.handleShowModal} />;
      case "NewProfitForm":
        return <NewProfitForm callback={this.handleShowModal} />;
      case "NewChargeForm":
        return <NewChargeForm callback={this.handleShowModal} />;
      default:
        return "";
    }
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
            <Button href="#" bsStyle="primary" onClick={this.handleNewTransfer}>
              New Transfer
            </Button>
            <Button href="#" bsStyle="info" onClick={this.handleNewProfit}>
              New Profit
            </Button>
            <Button href="#" onClick={this.handleNewCharge}>
              New Charge
            </Button>
            <Button href="#" bsStyle="warning" onClick={this.resetState}>
              Update transactions
            </Button>
          </ButtonGroup>
          <Modal show={this.state.showModal} onHide={this.handleShowModal}>
            {this.whichForm()}
          </Modal>
        </div>
        <Timeline
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
