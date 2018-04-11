import Token from "./localStorageProvider";
import getTokenFromXhr from "./getTokenFromXhr";
import getUserInfo from "./setCurrentUser";
import setXhrHeaders from "./setXhrHeaders";

function checkUser() {
  try {
    let token = Token.getToken();
    if (token !== null && token !== undefined) {
      let xhr = new XMLHttpRequest();
      xhr.open("get", "http://localhost:3000/authn/checkme", false);
      xhr = setXhrHeaders(xhr, token);
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

export const logged = checkUser();
