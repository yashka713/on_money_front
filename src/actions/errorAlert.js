export default function showErrorAlert(status, message = "") {
  return {
    type: "SHOW_SIGNIN_ERROR_ALERT",
    payload: {
      status: status,
      message: message
    }
  };
}
