export default function showErrorAlert(status) {
  return {
    type: "SHOW_ERROR_ALERT",
    payload: status
  };
}
