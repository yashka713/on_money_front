export default function downloadCategories(categories, type) {
  if (type === "charge") {
    return {
      type: "DOWNLOAD_CHARGE_CATEGORIES",
      payload: {
        type: type,
        items: categories
      }
    };
  } else if (type === "profit") {
    return {
      type: "DOWNLOAD_PROFIT_CATEGORIES",
      payload: {
        type: type,
        items: categories
      }
    };
  }
}
