import LocalStorageUtils from "./LocalStorageUtils";

class UserSessionUtils {
  getTokenFromParams = responce => {
    try {
      return {
        client: responce.headers.get("client"),
        uid: responce.headers.get("uid"),
        tokenType: responce.headers.get("token-type"),
        accessToken: responce.headers.get("access-token"),
        expiry: responce.headers.get("expiry")
      };
    } catch (error) {
      console.error(error);
    }
  };
  postRequest(url, data) {
    const headers = new Headers();
    headers.append("Content-type", "application/json");
    //
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(data)
    };
    //
    const request = new Request(url, options);
    fetch(request)
      .then(responce => {
        return this.getTokenFromParams(responce);
      })
      .then(token => {
        const storage = new LocalStorageUtils();
        storage.saveToken(token);
      })
      .catch(error => {
        console.error(error); // Error: Not Found
      });
  }
}

export default UserSessionUtils;
