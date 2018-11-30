import LSProvider from "../session/localStorageProvider";
import getUserInfoFromPromise from "../session/getTokenFromPromise";
import errorParser from "../errors/errorParser";
import axios from "axios";

export default function updateProfileRequest(url, formData) {
  for (let key in formData) {
    if (key !== "name" && key !== "nickname") {
      delete formData[key];
    }
  }
  let token = LSProvider.getToken();
  return axios
    .put(
      url,
      { user: formData },
      {
        headers: { Authorization: "Bearer " + token }
      }
    )
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
