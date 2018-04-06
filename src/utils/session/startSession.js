import Token from "./localStorageProvider";
import getTokenFromPromise from "./getTokenFromPromise";
import getUserInfo from "./setCurrentUser";

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
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        const token = getTokenFromPromise(response);
        Token.saveToken(token);
      } else {
        localStorage.clear();
      }
      return response.json().then(json => {
        return {
          data: json.data,
          status: response.status
        };
      });
    })
    .then(answer => {
      const current_user = getUserInfo(answer.data);
      return { status: answer.status, current_user: current_user };
    })
    .catch(error => {
      console.error(error);
    });
}
