const STORAGE_NAME = "token";

export default {
  saveToken(token) {
    try {
      localStorage.removeItem(STORAGE_NAME);
      localStorage.setItem(STORAGE_NAME, JSON.stringify(token));
      console.log("saved");
    } catch (error) {
      console.error(error);
    }
  },
  getToken() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_NAME));
    } catch (error) {
      console.error(error);
    }
  }
};
