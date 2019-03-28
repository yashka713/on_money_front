import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import deleteTransaction from "../../../../../actions/transactions/deleteTransaction";
import updateAccount from "../../../../../actions/accounts/updateAccount";

class UpdateTransactionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: this.getInitialState()
    };
  }

  getInitialState() {
    let transaction = this.props.transactions.filter(item => {
      return item.id === this.props.item.id;
    });
    return {
      transaction: transaction
    };
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.closeUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">
            Destroying transaction
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">
            Are you sure you want to delete this transaction?{" "}
            {this.state.transaction.id}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="danger">Delete</Button>
          <Button onClick={this.state.closeUpdateModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(
  state => ({
    transactions: state.transactions.transactions
  }),
  dispatch => ({
    deleteTransaction: transaction => {
      dispatch(deleteTransaction(transaction));
    },
    updateAccount: account => {
      dispatch(updateAccount(account));
    }
  })
)(UpdateTransactionModal);
