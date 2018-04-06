import Token from "./localStorageProvider";
import getTokenFromXhr from "./getTokenFromXhr";
import getUserInfo from "./setCurrentUser";

function checkUser() {
  try {
    let token = Token.getToken();
    if (token !== null && token !== undefined) {
      let xhr = new XMLHttpRequest();
      xhr.open("get", "http://localhost:3000/authn/checkme", false);
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
      return {
        status: xhr.status,
        current_user: getUserInfo(JSON.parse(xhr.responseText))
      };
    }
    return { status: 0, current_user: {} };
  } catch (error) {
    console.error(error);
  }
}

function user_present() {
  const answer = checkUser();
  return answer.status >= 200 && answer.status < 300;
}

export const logged = user_present();
