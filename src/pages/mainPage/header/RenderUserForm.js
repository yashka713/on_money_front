import React, {Fragment} from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faBackward from "@fortawesome/fontawesome-free-solid/faBackward";
import UserUpdateForm from "./UserUpdateTab";

const RenderUserForm = ({ callback, showModal }) => (
  <Fragment>
    <FontAwesomeIcon
      icon={faBackward}
      className="cursor-pointer close"
      onClick={callback}
    />
    <UserUpdateForm showModal={showModal} />
  </Fragment>
);

export default RenderUserForm;
