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
  }
};
