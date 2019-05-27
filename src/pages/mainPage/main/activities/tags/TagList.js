import React, { Component } from "react";
import { connect } from "react-redux";
import downloadTags from "../../../../../actions/tags/downloadTags";
import getRequest from "../../../../../services/requests/getRequest";
import Api from "../../../../../api/Api";
import { Tag } from "./Tag";
import TagInput from "./TagInput";
import TagTrash from "./TagTrash";

class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      tag: {
        id: 0,
        name: ""
      }
    };

    this.getTagListRequest = this.getTagListRequest.bind(this);
    this.tagList = this.tagList.bind(this);
    this.updateTag = this.updateTag.bind(this);
  }

  componentDidMount() {
    this.getTagListRequest(this.state.currentPage);
  }

  getTagListRequest(pageNumber) {
    return getRequest(Api.tagsPath(pageNumber)).then(responce => {
      this.props.downloadTags(responce);
      return responce;
    });
  }

  tagList() {
    return this.props.tags.map(item => {
      return <Tag tag={item} key={item.id} updateClick={this.updateTag} />;
    });
  }

  updateTag(id) {
    const tag = this.props.tags.filter(tag => tag.id === id)[0];
    this.setState({ tag: { id: tag.id, name: tag.attributes.name } });
  }

  render() {
    const tags = this.tagList();
    return (
      <div className="col-md-5">
        <TagInput id={this.state.tag.id} name={this.state.tag.name} />
        <div>
          <div className="tagsContainer">
            {tags.length > 0 ? (
              tags
            ) : (
              <div className="text-center">
                <strong>Nothing to show</strong>
              </div>
            )}
          </div>
          <TagTrash />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    tags: state.tags.tags
  }),
  dispatch => ({
    downloadTags: tags => {
      dispatch(downloadTags(tags));
    }
  })
)(TagList);
