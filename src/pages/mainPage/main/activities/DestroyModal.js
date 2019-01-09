import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import capitalize from "lodash/capitalize";
import { connect } from "react-redux";
import clear_destroyer from "../../../../actions/clear_destroyer";
import Api from "../../../../api/Api";
import destroyAccountRequest from "../../../../services/requests/destroyAccountRequest";
import destroyAccount from "../../../../actions/account/destroyAccount";

class DestroyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.destroyItem = this.destroyItem.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({ showModal: props.showModal });
  }

  destroyItem() {
    if (this.props.destroy_item.type === "accounts") {
      destroyAccountRequest(Api.accountPath(this.props.destroy_item.id)).then(
        responce => {
          if (responce.status === 200) {
            this.props.destroyAccount(this.props.destroy_item);
            this.props.callback();
          } else {
            console.log("error", responce);
          }
          this.props.clearDestroyer();
        }
      );
    }
    console.log("destroyed");
    this.props.callback();
  }

  render() {
    return !this.props.item.attributes ? (
      ""
    ) : (
      <Modal show={this.state.showModal} onHide={this.props.callback}>
        <Modal.Header closeButton>
          <Modal.Title>
            You are trying to delete 1 of the {capitalize(this.props.item.type)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete <mark><strong>{this.props.item.attributes.name}</strong></mark>?
          </p>
          <p>This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.callback}>Close</Button>
          <Button bsStyle="danger" onClick={this.destroyItem}>
            Destroy
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(
  state => ({
    destroy_item: state.destroyer.destroy_item
  }),
  dispatch => ({
    clearDestroyer: () => {
      dispatch(clear_destroyer());
    },
    destroyAccount: item => {
      dispatch(destroyAccount(item.id));
    }
  })
)(DestroyModal);
