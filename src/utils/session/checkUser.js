import Token from "./localStorageProvider";
import getTokenFromXhr from "./getTokenFromXhr";

export default function checkUser() {
  try {
    let token = Token.getToken();
    if (token !== null && token !== undefined) {
      let xhr = new XMLHttpRequest();
      xhr.open("get", "https://api-on-money.herokuapp.com/authn/checkme", false);
      xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("token-type", token["tokenType"]);
      xhr.setRequestHeader("access-token", token["accessToken"]);
      xhr.setRequestHeader("uid", token["uid"]);
      xhr.setRequestHeader("expiry", token["expiry"]);
      xhr.setRequestHeader("client", token["client"]);
      xhr.send();
      if (xhr.status >= 200 && xhr.status < 300) {
        Token.saveToken(getTokenFromXhr(xhr));
      } else {
        localStorage.clear();
      }
      return xhr.status;
    }
    return 0;
  } catch (error) {
    console.error(error);
  }
}
