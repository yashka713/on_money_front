export default function addAccount(account) {
  return {
    type: "UPDATE_ACCOUNT",
    payload: account
  };
}
