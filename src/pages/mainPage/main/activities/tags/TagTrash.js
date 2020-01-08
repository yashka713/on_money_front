import React, {Component, Fragment} from "react";
import { connect } from "react-redux";
import destroyTag from "../../../../../actions/tags/destroyTag";
import destroyRequest from "../../../../../services/requests/destroyRequest";
import Api from "../../../../../api/Api";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const HIDDEN_CLASS = "hidden";

class TagTrash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagId: 0
    };

    this.onDrop = this.onDrop.bind(this);
    this.destroyTag = this.destroyTag.bind(this);
    this.hideApprove = this.hideApprove.bind(this);
    this.showApprove = this.showApprove.bind(this);
  }

  onDrop(ev) {
    const id = ev.dataTransfer.getData("tagId");

    this.setState({ tagId: id }, () => this.showApprove());
  }

  hideApprove() {
    this.setState({ tagId: 0 }, () => {
      document
        .getElementsByClassName("approveBox")[0]
        .classList.add(HIDDEN_CLASS);
    });
  }

  showApprove() {
    document
      .getElementsByClassName("approveBox")[0]
      .classList.remove(HIDDEN_CLASS);
  }

  destroyTag() {
    const tagId = this.state.tagId;
    destroyRequest(Api.tagPath(tagId)).then(responce => {
      if (responce.status === 200) {
        this.props.destroyTag(tagId);
      } else {
        console.log("error", responce);
      }
    });
    this.hideApprove();
    return false;
  }

  render() {
    const trashTooltip = (
      <Tooltip id="trashTooltip">Remove element by drag and drop.</Tooltip>
    );
    return (
      <OverlayTrigger placement="top" overlay={trashTooltip}>
        <Fragment>
          <div className="text-center approveBox hidden">
            <div
              onClick={this.destroyTag}
              className="approveBox-answer approveBox-answer__approve"
            >
              Accept
            </div>
            <div
              onClick={this.hideApprove}
              className="approveBox-answer approveBox-answer__cancel"
            >
              Cancel
            </div>
          </div>
          <div
            className="tagTrash text-center"
            onDragOver={e => e.preventDefault()}
            onDrop={e => this.onDrop(e)}
          >
            Remove Tag
          </div>
        </Fragment>
      </OverlayTrigger>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    destroyTag: id => {
      dispatch(destroyTag(id));
    }
  })
)(TagTrash);
