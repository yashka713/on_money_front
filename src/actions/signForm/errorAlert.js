export default function showErrorAlert(message) {
  return {
    type: "SHOW_SIGNIN_ERROR_ALERT",
    payload: message
  };
}
