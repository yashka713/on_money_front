export default function updateTransaction(item) {
  return {
    type: "UPDATE_TRANSACTION",
    payload: item
  };
}
