export default function destroyer(item) {
  return {
    type: "UPDATE_DESTROYER",
    payload: {
      item: item
    }
  };
}
