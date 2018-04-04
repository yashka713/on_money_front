import Token from "./token";
import getTokenFromParams from "./getTokenFromParams";

export default function checkUser() {
  try {
    let token = Token.getToken();
    if (token !== null) {
      const options = {
        method: "GET",
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "token-type": token["token-type"],
          "access-token": token["access-token"],
          "uid": token["uid"],
          "expiry": token["expiry"],
          "client": token["client"]
        }
      };
      return fetch("http://localhost:3000/authn/checkme", options)
        .then(responce => {
          if (responce.status >= 200 && responce.status < 300) {
            const token = getTokenFromParams(responce);
            Token.saveToken(token);
          } else {
            localStorage.clear();
          }
          return responce.status;
        })
        .catch(error => {
          console.error(error);
        });
    }
  } catch (error) {
    console.error(error);
  }
}
