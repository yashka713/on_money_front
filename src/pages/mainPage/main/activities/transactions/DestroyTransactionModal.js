import React, { Component } from "react";
import capitalize from "lodash/capitalize";
import Api from "../../../../../api/Api";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import deleteTransaction from "../../../../../actions/transactions/deleteTransaction";
import updateAccount from "../../../../../actions/accounts/updateAccount";
import destroyTransactionRequest from "../../../../../services/requests/destroyTransactionRequest";

class DestroyTransactionModal extends Component {
  constructor(props) {
    super(props);

    this.handleDeleteConfirmation = this.handleDeleteConfirmation.bind(this);
  }

  handleDeleteConfirmation(event) {
    event.preventDefault();

    destroyTransactionRequest(
      Api.deleteTransactionPath(this.props.item.id, this.props.item.type)
    ).then(responce => {
      if (responce.status === 200) {
        this.props.deleteTransaction(responce.data.data);
        this.props.updateAccount(responce.data.included.pop());
        this.props.updateAccount(responce.data.included.pop());
        this.props.closeDeleteModal();
      } else {
        console.log("error", responce);
      }
    });
    return false;
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        bsSize="small"
        onHide={this.props.closeDeleteModal}
        container={this.props.container}
        aria-labelledby="contained-modal-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">
            Destroying transaction
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">
            Are you sure you want to delete this{" "}
            <strong>{capitalize(this.props.item.type)}</strong> transaction?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleDeleteConfirmation} bsStyle="danger">
            Delete
          </Button>
          <Button onClick={this.props.closeDeleteModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(null, dispatch => ({
  deleteTransaction: transaction => {
    dispatch(deleteTransaction(transaction));
  },
  updateAccount: account => {
    dispatch(updateAccount(account));
  }
}))(DestroyTransactionModal);
