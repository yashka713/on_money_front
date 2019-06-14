export default function showSuccessAlert(message) {
  return {
    type: "SHOW_SIGNIN_SUCCESS_ALERT",
    payload: message
  };
}
