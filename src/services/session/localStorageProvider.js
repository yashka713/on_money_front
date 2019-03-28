const TOKEN = "token";

export default {
  saveToken(token) {
    try {
      localStorage.setItem(TOKEN, JSON.stringify(token));
    } catch (error) {
      console.error(error);
      this.clearLS();
    }
  },
  getToken() {
    try {
      const data = localStorage.getItem(TOKEN);
      if (data !== null && data !== undefined) {
        return JSON.parse(data);
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      this.clearLS();
      return null;
    }
  },
  clearLS() {
    localStorage.clear();
  }
};
