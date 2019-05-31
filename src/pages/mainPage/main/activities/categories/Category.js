import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import faPencilAlt from "@fortawesome/fontawesome-free-solid/faPencilAlt";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import showTrashIcon from "../../../../../actions/showTrashIcon";
import destroyer from "../../../../../actions/destroyer";
import clear_destroyer from "../../../../../actions/clear_destroyer";
import dndLogo from "../../../../../services/utils/dndLogo";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragStart(e, id) {
    this.props.handleShowTrashIcon(true);
    this.props.handleDestroyer(this.props.category);
    e.dataTransfer.setDragImage(dndLogo(), 50, 50);
  }

  onDragEnd(e) {
    this.props.handleShowTrashIcon(false);
    e.preventDefault();
  }

  render() {
    const tooltip = (
      <Popover id="popover" title="Note:">
        <p>{this.props.category.attributes.note}</p>
      </Popover>
    );

    return (
      <li
        className="flexBox text-center hidden-edit"
        draggable
        onDragStart={e => this.onDragStart(e, this.props.category.id)}
        onDragEnd={e => this.onDragEnd(e)}
      >
        <OverlayTrigger placement="bottom" overlay={tooltip}>
          <div className="box-info">
            <p>{this.props.category.attributes.name}</p>
          </div>
        </OverlayTrigger>
        <div className="box-settings">
          <FontAwesomeIcon
            icon={faPencilAlt}
            className="cursor-pointer"
            onClick={this.props.updateCallback}
          />
        </div>
      </li>
    );
  }
}

export default connect(
  state => ({
    showTrashIcon: state.showTrashIcon
  }),
  dispatch => ({
    handleShowTrashIcon: status => {
      dispatch(showTrashIcon(status));
    },
    handleDestroyer: item => {
      dispatch(destroyer(item));
    },
    clearDestroyer: () => {
      dispatch(clear_destroyer());
    }
  })
)(Category);
