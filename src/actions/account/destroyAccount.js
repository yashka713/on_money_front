export default function destroyAccount(id) {
  return {
    type: "DESTROY_ACCOUNT",
    payload: id
  };
}
