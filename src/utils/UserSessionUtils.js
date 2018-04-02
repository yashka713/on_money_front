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
    return fetch(request)
      .then(responce => {
        if (responce.status >= 200 && responce.status < 300) {
          const token = this.getTokenFromParams(responce);
          const storage = new LocalStorageUtils();
          storage.saveToken(token);
        }
        return responce.statusText;
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default UserSessionUtils;
