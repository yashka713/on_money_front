export default function showSuccessAlert(status, message = "") {
  return {
    type: "SHOW_SUCCESS_ALERT",
    payload: {
      status: status,
      message: message
    }
  };
}
