import LSProvider from "../session/localStorageProvider";
import errorParser from "../errors/errorParser";
import axios from "axios";

export default function updateAccountRequest(url, formData) {
  let token = LSProvider.getToken();
  return axios
    .patch(
      url,
      { account: formData },
      {
        headers: { Authorization: "Bearer " + token }
      }
    )
    .then(response => {
      return response;
    })
    .catch(error => {
      return errorParser(error);
    });
}
