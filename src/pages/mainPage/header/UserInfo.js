import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faEdit from "@fortawesome/fontawesome-free-solid/faEdit";

const UserInfo = ({ current_user, callback }) => {
  return (
    <div>
      <FontAwesomeIcon
        icon={faEdit}
        className="cursor-pointer close"
        onClick={callback}
      />
      <p>Email: {current_user.email}</p>
      <p>Name: {current_user.name || ""}</p>
      <p>Nickname: {current_user.nickname || ""}</p>
    </div>
  );
};

export default UserInfo;
