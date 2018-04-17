export default function updateUser(user) {
  return {
    type: "UPDATE_USER",
    payload: user
  };
}
