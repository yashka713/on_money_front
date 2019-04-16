import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import faPencilAlt from "@fortawesome/fontawesome-free-solid/faPencilAlt";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

import { connect } from "react-redux";
import showTrashIcon from "../../../../../actions/showTrashIcon";
import destroyer from "../../../../../actions/destroyer";

import dndLogo from "../../../../../services/utils/dndLogo";
import gradient from "random-gradient";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragStart(e, id) {
    this.props.handleShowTrashIcon(true);
    this.props.handleDestroyer(this.props.account);
    e.dataTransfer.setDragImage(dndLogo(), 50, 50);
  }

  onDragEnd(e) {
    this.props.handleShowTrashIcon(false);
    e.preventDefault();
  }

  render() {
    const popover = (
      <Popover id="popover" title="Note:">
        <p>{this.props.account.attributes.note}</p>
      </Popover>
    );

    const uniqGrName = "account_" + this.props.account.id;
    const bgGradient = { background: gradient(uniqGrName) };

    return (
      <li
        style={bgGradient}
        className="accountBox text-center hidden-edit"
        draggable
        onDragStart={e => this.onDragStart(e, this.props.account.id)}
        onDragEnd={e => this.onDragEnd(e)}
      >
        <OverlayTrigger placement="bottom" overlay={popover}>
          <div className="box-info">
            <p className="maxLines">{this.props.account.attributes.name}</p>
            <p>{this.props.account.attributes.balance}</p>
            <p>{this.props.account.attributes.currency}</p>
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
    }
  })
)(Account);
