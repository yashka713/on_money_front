import React, { Component, Fragment } from "react";
import { Modal } from "react-bootstrap";
import destroyTransactionReceipt from "../../../../../services/requests/destroyTransactionReceipt";
import Api from "../../../../../api/Api";
import { connect } from "react-redux";
import updateTransaction from "../../../../../actions/transactions/updateTransaction";
import successAlert from "../../../../../actions/successAlert";

class ReceiptImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReceiptModal: false
    };
  }

  handleClose = () => this.setState({ showReceiptModal: false });
  handleShow = () => this.setState({ showReceiptModal: true });

  handleReceiptDestroy = transaction => {
    destroyTransactionReceipt(Api.destroyReceiptPath(transaction.id)).then(
      responce => {
        if (responce.status === 200) {
          this.props.updateTransaction(responce.data);
        } else {
          console.log("error", responce);
        }
      }
    );
    return false;
  };

  render() {
    const { transaction } = this.props;

    if (transaction && transaction.attributes.receipt) {
      const receipt = transaction.attributes.receipt;

      const imageName = receipt.filename;

      return (
        <Fragment>
          <div
            className="transaction-control cursor-pointer control-destroy"
            onClick={() => this.handleReceiptDestroy(transaction)}
          >
            destroy
          </div>
          <img
            src={receipt.thumbnail}
            className="img-thumbnail cursor-pointer"
            alt={imageName}
            onClick={this.handleShow}
          />
          <Modal show={this.state.showReceiptModal} onHide={this.handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
              <img
                className="center-block max-width-100"
                src={receipt.original}
                alt={imageName}
              />
            </Modal.Body>
          </Modal>
        </Fragment>
      );
    } else {
      return null;
    }
  }
}

export default connect(
  null,
  dispatch => ({
    updateTransaction: transaction => {
      dispatch(updateTransaction(transaction.data));
      dispatch(successAlert(true, "Receipt successfully destroyed"));
    }
  })
)(ReceiptImage);
