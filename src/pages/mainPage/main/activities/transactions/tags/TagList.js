import React, { Component } from "react";
import { Tag } from "./Tag";
import { connect } from "react-redux";

class TagList extends Component {
  constructor(props) {
    super(props);

    this.tagList = this.tagList.bind(this);
  }

  tagList() {
    const transactionTagIds = this.props.transaction.relationships.tags.data.map(
      tag => tag.id
    );
    const tags = this.props.tags.filter(tag =>
      transactionTagIds.includes(tag.id)
    );

    return tags.map(tag => <Tag tag={tag} key={tag.id} />);
  }

  render() {
    const tags = this.tagList();
    return (
      <div className="tagsContainer">
        {tags.length > 0 ? (
          tags
        ) : (
          <div className="text-center display-block">
            <strong>Nothing to show</strong>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    tags: state.tags.tags
  }),
  null
)(TagList);
