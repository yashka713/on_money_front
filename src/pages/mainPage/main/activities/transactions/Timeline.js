import { connect } from "react-redux";
import React, { Component } from "react";
import { TransactionsList } from "./TransactionsList";
import DestroyTransactionModal from "./DestroyTransactionModal";
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
    this.deleteTransactionModal = this.deleteTransactionModal.bind(this);
  }

  deleteTransactionModal(id, type) {
    let showModal = !this.state.showDestroyModal;
    this.setState({
      showDestroyModal: showModal,
      transaction: {
        id: id,
        type: type
      }
    });
  }

  render() {
    let disPrevPage = this.props.currentPage <= 1;
    let disNextPage = this.props.currentPage === this.props.lastPage;

    return this.props.transactions.length > 0 ? (
      <div className="timeline modal-container">
        <DestroyTransactionModal
          container={this}
          show={this.state.showDestroyModal}
          closeDeleteModal={this.deleteTransactionModal}
          item={this.state.transaction}
        />
        <Pager>
          <Pager.Item
            href="#"
            previous
            disabled={disPrevPage}
            onClick={() => this.props.handlePreviousPage()}
          >
            &larr; Previous
          </Pager.Item>
          <Pager.Item
            href="#"
            next
            disabled={disNextPage}
            onClick={() => this.props.handleNextPage()}
          >
            Next &rarr;
          </Pager.Item>
        </Pager>
        <TransactionsList
          transactions={this.props.transactions}
          deleteTransactionCallback={this.deleteTransactionModal}
          updateTransactionCallback={this.props.updateHandler}
        />
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
