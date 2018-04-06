export default function showSuccessAlert(status) {
  return {
    type: "SHOW_SUCCESS_ALERT",
    payload: status
  };
}
