export default function addCategory(category, type) {
  if (type === "charge") {
    return {
      type: "ADD_CHARGE_CATEGORIES",
      payload: category
    };
  } else if (type === "profit") {
    return {
      type: "ADD_PROFIT_CATEGORIES",
      payload: category
    };
  }
}
