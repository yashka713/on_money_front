import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faBackward from "@fortawesome/fontawesome-free-solid/faBackward";
import UserUpdateForm from "../../../forms/UserUpdateForm";

const RenderUserForm = ({ callback, showModal }) => (
  <div>
    <FontAwesomeIcon
      icon={faBackward}
      className="cursor-pointer close"
      onClick={callback}
    />
    <UserUpdateForm showModal={showModal} />
  </div>
);

export default RenderUserForm;
