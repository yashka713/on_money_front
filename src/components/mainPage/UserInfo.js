import React from "react";

const UserInfo = ({ current_user, callback }) => {
  return (
    <div>
      <p>Email: {current_user.email}</p>
      <p>Name: {current_user.name || ""}</p>
      <p>Nickname: {current_user.nickname || ""}</p>
    </div>
  );
};

export default UserInfo;
