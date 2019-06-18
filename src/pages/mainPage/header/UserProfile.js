import React, { Component, Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import UserInfo from "./UserInfo";
import RenderUserForm from "./RenderUserForm";

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
        <span onClick={this.handleShowModal}>User profile</span>
        <Modal show={this.state.showModal} onHide={this.handleShowModal}>
          <Modal.Header closeButton>
            <Modal.Title>User profile: </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="user-info">
              <Fragment>
                {this.state.showForm ? (
                  <RenderUserForm
                    callback={this.handleShowForm}
                    showModal={this.handleShowModal}
                  />
                ) : (
                  <UserInfo
                    current_user={this.props.current_user}
                    callback={this.handleShowForm}
                  />
                )}
              </Fragment>
            </div>
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
