import React from "react";
import Category from "./Category";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faPlus from "@fortawesome/fontawesome-free-solid/faPlus";
import CategoryModal from "./CategoryModal";

export default class CategoriesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      modalType: "",
      item: {}
    };

    this.handleShowModal = this.handleShowModal.bind(this);
    this.newCategoryModal = this.newCategoryModal.bind(this);
    this.updateCategoryModal = this.updateCategoryModal.bind(this);
  }

  handleShowModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  newCategoryModal() {
    this.setState({
      modalType: "new"
    });
    this.handleShowModal();
  }

  updateCategoryModal(category) {
    this.setState({
      modalType: "update",
      item: category
    });
    this.handleShowModal();
  }

  render() {
    let categoriestList = this.props.list.map(category => {
      return (
        <Category
          category={category}
          key={category.id}
          updateCallback={() => {
            this.updateCategoryModal(category);
          }}
        />
      );
    });

    return (
      <ul className="flexContainer">
        {categoriestList}
        <li className="flexBox centralize" onClick={this.newCategoryModal}>
          <span>
            <FontAwesomeIcon
              icon={faPlus}
              className="cursor-pointer addCategory"
            />
          </span>
        </li>
        <CategoryModal
          callback={this.handleShowModal}
          showModal={this.state.showModal}
          modalType={this.state.modalType}
          type={this.props.type}
          item={this.state.item}
        />
      </ul>
    );
  }
}
