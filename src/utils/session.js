import Token from "./token";
import getTokenFromParams from "./getTokenFromParams";

export default function startSession(url, data) {
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
