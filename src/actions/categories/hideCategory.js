export default function hideCategory(id, type) {
  if (type === "charge") {
    return {
      type: "HIDE_CHARGE_CATEGORIES",
      payload: id
    };
  } else if (type === "profit") {
    return {
      type: "HIDE_PROFIT_CATEGORIES",
      payload: id
    };
  }
}
