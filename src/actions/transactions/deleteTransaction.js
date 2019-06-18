export default function deleteTransaction(transaction) {
  return {
    type: "DELETE_TRANSACTION",
    payload: transaction
  };
}
