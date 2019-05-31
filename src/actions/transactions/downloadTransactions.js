export default function downloadTransactions(transactions) {
  return {
    type: "DOWNLOAD_TRANSACTIONS",
    payload: transactions
  };
}
