export default function successAuth(user) {
  return {
    type: "AUTH_SUCCESS",
    payload: user
  };
}
