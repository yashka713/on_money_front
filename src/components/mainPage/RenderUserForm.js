import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faBackward from "@fortawesome/fontawesome-free-solid/faBackward";
import UserUpdateForm from "../../forms/UserUpdateForm";

const RenderUserForm = ({ callback }) => (
  <div>
    <FontAwesomeIcon
      icon={faBackward}
      className="cursor-pointer close"
      onClick={callback}
    />
    <UserUpdateForm action="http://localhost:3000/auth" id="UserUpdateForm" />
  </div>
);

export default RenderUserForm;
