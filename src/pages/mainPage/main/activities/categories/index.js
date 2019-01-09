import React from "react";
import getRequest from "../../../../../services/requests/getRequest";
import { CategoryHeader } from "./CategoryHeader";
import { CategoriesList } from "./CategoriesList";

export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentWillMount() {
    getRequest(this.props.url).then(responce => {
      this.setState({
        categories: responce
      });
    });
  }

  render() {
    return (
      <div className="margin-top-15">
        <CategoryHeader categoryType={this.props.type} />
        <CategoriesList list={this.state.categories} />
      </div>
    );
  }
}