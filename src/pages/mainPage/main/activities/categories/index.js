import React from "react";
import getRequest from "../../../../../services/requests/getRequest";
import { CategoryHeader } from "./CategoryHeader";
import CategoriesList from "./CategoriesList";
import { connect } from "react-redux";
import downloadCategories from "../../../../../actions/categories/downloadCategories";

class Categories extends React.Component {
  componentDidMount() {
    getRequest(this.props.url).then(responce => {
      this.props.downloadCategories(responce, this.props.type);
    });
  }

  render() {
    return (
      <div className="col-md-6">
        <CategoryHeader categoryType={this.props.type} />
        <CategoriesList
          list={this.props.categories[this.props.type]}
          type={this.props.type}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    categories: state.categories.categories
  }),
  dispatch => ({
    downloadCategories: (categories, type) => {
      dispatch(downloadCategories(categories, type));
    }
  })
)(Categories);
