import LSProvider from "../session/localStorageProvider";
import errorParser from "../errors/errorParser";
import axios from "axios";

export default function postRequest(url, sendData) {
  let token = LSProvider.getToken();
  return axios
    .post(url, sendData, {
      headers: { Authorization: "Bearer " + token }
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      return errorParser(error);
    });
}
