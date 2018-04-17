import Token from "../session/localStorageProvider";
import getUserInfo from "../session/setCurrentUser";
import getTokenFromPromise from "../session/getTokenFromPromise";
import setHeaderForFetch from "../session/setHeaderForFetch";

export default function updateUser(data) {
  const token = Token.getToken();
  const headers = setHeaderForFetch(token);

  const options = {
    method: "put",
    headers,
    body: JSON.stringify(data)
  };
  const request = new Request("http://localhost:3000/auth", options);
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
      let current_user = {};
      if (answer.status < 300 && answer.status >= 200) {
        current_user = getUserInfo(answer.data);
      }
      return { status: answer.status, current_user: current_user };
    })
    .catch(error => {
      console.error(error);
    });
}
