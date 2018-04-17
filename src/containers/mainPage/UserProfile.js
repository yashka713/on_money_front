import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faBackward from "@fortawesome/fontawesome-free-solid/faBackward";
import faEdit from "@fortawesome/fontawesome-free-solid/faEdit";

import UserInfo from "../../components/mainPage/UserInfo";
import UserUpdateForm from "../../forms/UserUpdateForm";

class UserProfile extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleShowForm = this.handleShowForm.bind(this);
    this.state = {
      showModal: false,
      showForm: false
    };
  }
  handleShowModal() {
    this.setState({ showModal: !this.state.showModal });
  }
  handleShowForm() {
    this.setState({ showForm: !this.state.showForm });
  }
  render() {
    return (
      <div>
        <div
          onClick={this.handleShowModal}
          className="user-profile cursor-pointer config-element"
        >
          User profile
        </div>
        <Modal show={this.state.showModal} onHide={this.handleShowModal}>
          <Modal.Header closeButton>
            {this.state.showForm ? (
              <FontAwesomeIcon
                icon={faBackward}
                className="cursor-pointer close fa-margin"
                onClick={this.handleShowForm}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEdit}
                className="cursor-pointer close fa-margin"
                onClick={this.handleShowForm}
              />
            )}
            <Modal.Title>User profile: </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.showForm ? (
              <UserUpdateForm />
            ) : (
              <UserInfo current_user={this.props.current_user} />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleShowModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(state => ({
  current_user: state.current_user
}))(UserProfile);
