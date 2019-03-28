export default function newTransaction(item) {
  return {
    type: "NEW_TRANSACTION",
    payload: item
  };
}
