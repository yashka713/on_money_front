import Token from "./localStorageProvider";
import getTokenFromPromise from "./getTokenFromPromise";

export default function startSession(url, formData) {
  for (let key in formData) {
    if (key !== "email" && key !== "password") {
      delete formData[key];
    }
  }
  const data = formData;
  const headers = new Headers();
  headers.append("Content-type", "application/json");
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(data)
  };

  const request = new Request(url, options);
  return fetch(request)
    .then(responce => {
      if (responce.status >= 200 && responce.status < 300) {
        const token = getTokenFromPromise(responce);
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
