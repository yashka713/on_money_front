import LSProvider from "../session/localStorageProvider";
import getUserInfoFromPromise from "../session/getTokenFromPromise";
import errorParser from "../errors/errorParser";
import axios from "axios";

export default function startSessionRequest(url, formData) {
  for (let key in formData) {
    if (key !== "email" && key !== "password") {
      delete formData[key];
    }
  }
  return axios
    .post(url, { user: formData })
    .then(response => {
      const data = getUserInfoFromPromise(response);
      LSProvider.saveToken(data["jwt"]);
      return data;
    })
    .catch(error => {
      localStorage.clear();
      return errorParser(error);
    });
}
