import React, { Component } from "react";
import Accounts from "./accounts";
import Categories from "./categories";
import faTrash from "@fortawesome/fontawesome-free-solid/faTrash";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import DestroyModal from "./DestroyModal";
import Transactions from "./transactions";

import { connect } from "react-redux";

import Api from "../../../../api/Api";
import showTrashIcon from "../../../../actions/showTrashIcon";
import clear_destroyer from "../../../../actions/clear_destroyer";

class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

    this.onDrop = this.onDrop.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
  }

  handleShowModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  onDrop(e) {
    this.setState({ item: this.props.destroyItem });
    this.props.handleShowTrashIcon(false);
    this.handleShowModal();
  }

  onDragOver(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="activityBox">
        <FontAwesomeIcon
          icon={faTrash}
          className={
            !this.props.showTrashIcon
              ? "invisibleTrash"
              : "cursor-pointer trash"
          }
          onDrop={e => this.onDrop(e)}
          onDragOver={e => this.onDragOver(e)}
        />
        <Accounts />
        <div className="col-md-12 margin-top-15">
          <div className="col-md-12">
            <Categories url={Api.profitCategoriesPath()} type="profit" />
            <Categories url={Api.chargeCategoriesPath()} type="charge" />
          </div>
          <Transactions />
        </div>
        <DestroyModal
          showModal={this.state.showModal}
          callback={this.handleShowModal}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    showTrashIcon: state.trashIcon.showTrashIcon,
    destroyItem: state.destroyer.destroy_item
  }),
  dispatch => ({
    handleShowTrashIcon: status => {
      dispatch(showTrashIcon(status));
    },
    clearDestroyer: () => {
      dispatch(clear_destroyer());
    }
  })
)(Activities);
