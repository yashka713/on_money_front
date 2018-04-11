export default function getUserInfo(obj) {
  let user = {};
  user["name"] = obj.name;
  user["email"] = obj.email;
  user["nickname"] = obj.nickname;
  return user;
}
