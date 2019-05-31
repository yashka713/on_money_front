import LSProvider from "../session/localStorageProvider";
import errorParser from "../errors/errorParser";
import axios from "axios";

export default function newTransactionRequest(url, formData) {
  let token = LSProvider.getToken();
  return axios
    .post(url, formData, {
      headers: { Authorization: "Bearer " + token }
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      return errorParser(error);
    });
}
