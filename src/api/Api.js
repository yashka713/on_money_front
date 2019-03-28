export default {
  checkUserPath() {
    return process.env.REACT_APP_API_HOST + "sessions/check_user";
  },
  startSessionPath() {
    return process.env.REACT_APP_API_HOST + "sessions";
  },
  registerUserPath() {
    return process.env.REACT_APP_API_HOST + "profiles/registration";
  },
  profilesPath() {
    return process.env.REACT_APP_API_HOST + "profiles";
  },
  accountsPath() {
    return process.env.REACT_APP_API_HOST + "accounts";
  },
  profitCategoriesPath() {
    return (
      process.env.REACT_APP_API_HOST + "categories?type_of=profits_categories"
    );
  },
  chargeCategoriesPath() {
    return (
      process.env.REACT_APP_API_HOST + "categories?type_of=charges_categories"
    );
  },
  currenciesPath() {
    return process.env.REACT_APP_API_HOST + "currencies";
  },
  accountPath(id) {
    return process.env.REACT_APP_API_HOST + "accounts/" + id;
  },
  categoriesPath() {
    return process.env.REACT_APP_API_HOST + "categories/";
  },
  hideCategoryPath(id) {
    return process.env.REACT_APP_API_HOST + "categories/" + id + "?type=hide";
  },
  categoryPath(id) {
    return process.env.REACT_APP_API_HOST + "categories/" + id;
  },
  transactionsPath(pageNumber, from = "", to = "") {
    let request = "";
    if (from) request += `&date[from]=${from}`;
    if (to) request += `&date[to]=${to}`;

    return (
      process.env.REACT_APP_API_HOST +
      "transactions?" +
      "page[number]=" +
      pageNumber +
      request
    );
  },
  transfersPath() {
    return process.env.REACT_APP_API_HOST + "transfers";
  },
  profitsPath() {
    return process.env.REACT_APP_API_HOST + "profits";
  },
  chargesPath() {
    return process.env.REACT_APP_API_HOST + "charges";
  },
  deleteTransactionPath(id, type) {
    switch (type) {
      case "transfer":
        return this.transfersPath() + "/" + id;
      case "profit":
        return this.profitsPath() + "/" + id;
      case "charge":
        return this.chargesPath() + "/" + id;
      default:
        console.log("Unavailable type");
    }
  }
};
