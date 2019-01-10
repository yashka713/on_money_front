export default function downloadAccounts(accounts) {
  return {
    type: "DOWNLOAD_ACCOUNTS",
    payload: accounts
  };
}
