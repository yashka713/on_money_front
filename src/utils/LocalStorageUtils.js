class LocalStorageUtils {
  STORAGE_NAME = "token";

  saveToken(token) {
    try {
      localStorage.removeItem(this.STORAGE_NAME);
      localStorage.setItem(this.STORAGE_NAME, JSON.stringify(token));
      console.log("saved");
    } catch (error) {
      console.error(error);
    }
  }
  getToken() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_NAME));
    } catch (error) {
      console.error(error);
    }
  }
}

export default LocalStorageUtils;
