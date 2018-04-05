const STORAGE_NAME = "token";

export default {
  saveToken(token) {
    try {
      localStorage.removeItem(STORAGE_NAME);
      localStorage.setItem(STORAGE_NAME, JSON.stringify(token));
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  },
  getToken() {
    try {
      const data = localStorage.getItem(STORAGE_NAME);
      if (data !== null && data !== undefined) {
        return JSON.parse(data);
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
      return null;
    }
  }
};
