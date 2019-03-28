import { connect } from "react-redux";
import React, { Component } from "react";
import TransactionEvent from "./TransactionEvent";
import DestroyTransactionModal from "./DestroyTransactionModal";
import UpdateTransactionModal from "./UpdateTransactionModal";
import { Pager } from "react-bootstrap";

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDestroyModal: false,
      showUpdateModal: false,
      transaction: {
        id: null,
        type: ""
      }
    };
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.setTransaction = this.setTransaction.bind(this);
    this.deleteTransactionModal = this.deleteTransactionModal.bind(this);
    this.updateTransactionModal = this.updateTransactionModal.bind(this);
  }

  timelineEvents() {
    return this.props.transactions.map(item => {
      return (
        <TransactionEvent
          transaction={item}
          key={item.id}
          deleteTransactionCallback={this.deleteTransactionModal}
          updateTransactionCallback={this.updateTransactionModal}
          setTransaction={this.setTransaction}
        />
      );
    });
  }

  deleteTransactionModal() {
    let showModal = !this.state.showDestroyModal;
    this.setState({
      showDestroyModal: showModal
    });
  }

  updateTransactionModal() {
    let showModal = !this.state.showUpdateModal;
    this.setState({
      showUpdateModal: showModal
    });
  }

  setTransaction(id, type) {
    this.setState({
      transaction: {
        id: id,
        type: type
      }
    });
  }

  handlePreviousPage() {
    this.props.handlePreviousPage();
  }

  handleNextPage() {
    this.props.handleNextPage();
  }

  render() {
    let disPrevPage = this.props.currentPage <= 1;
    let disNextPage = this.props.currentPage === this.props.lastPage;
    let transactionsLength = this.props.transactions.length;

    return transactionsLength > 0 ? (
      <div className="timeline modal-container">
        <DestroyTransactionModal
          container={this}
          show={this.state.showDestroyModal}
          closeDeleteModal={this.deleteTransactionModal}
          item={this.state.transaction}
        />
        <UpdateTransactionModal
          show={this.state.showUpdateModal}
          closeUpdateModal={this.updateTransactionModal}
          item={this.state.transaction}
        />
        <Pager>
          <Pager.Item
            href="#"
            previous
            disabled={disPrevPage}
            onClick={this.handlePreviousPage}
          >
            &larr; Previous
          </Pager.Item>
          <Pager.Item
            href="#"
            next
            disabled={disNextPage}
            onClick={this.handleNextPage}
          >
            Next &rarr;
          </Pager.Item>
        </Pager>
        {this.timelineEvents()}
      </div>
    ) : (
      <div className="text-center">
        <strong>Nothing to show</strong>
      </div>
    );
  }
}

export default connect(
  state => ({
    transactions: state.transactions.transactions
  }),
  null
)(Timeline);
