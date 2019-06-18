import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import NewCategoryForm from "../../../../../forms/categories/NewCategoryForm";
import UpdateCategoryForm from "../../../../../forms/categories/UpdateCategoryForm";

export default class CategoryModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      showModal: props.showModal
    });
  }

  render() {
    const modalType = () => {
      if (this.props.modalType === "new") {
        return (
          <NewCategoryForm
            callback={this.props.callback}
            type={this.props.type}
          />
        );
      } else if (this.props.modalType === "update") {
        return (
          <UpdateCategoryForm
            callback={this.props.callback}
            type={this.props.type}
            item={this.props.item}
          />
        );
      }
    };
    return (
      <Modal show={this.state.showModal} onHide={this.props.callback}>
        {modalType()}
      </Modal>
    );
  }
}
