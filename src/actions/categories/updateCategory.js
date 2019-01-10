export default function updateCategory(category, type) {
  if (type === "charge") {
    return {
      type: "UPDATE_CHARGE_CATEGORIES",
      payload: category
    };
  } else if (type === "profit") {
    return {
      type: "UPDATE_PROFIT_CATEGORIES",
      payload: category
    };
  }
}
