import React, { Component, Fragment } from "react";
import { Modal } from "react-bootstrap";

export default class ReceiptImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReceiptModal: false
    };
  }

  handleClose = () => this.setState({ showReceiptModal: false });
  handleShow = () => this.setState({ showReceiptModal: true });

  render() {
    const { transaction } = this.props;

    if (transaction && transaction.attributes.receipt) {
      const receipt = transaction.attributes.receipt;

      const imageName = receipt.filename;

      return (
        <Fragment>
          <img
            src={receipt.thumbnail}
            className="img-thumbnail"
            alt={imageName}
            onClick={this.handleShow}
          />
          <Modal show={this.state.showReceiptModal} onHide={this.handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
              <img
                className="center-block"
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
