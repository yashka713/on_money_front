import LSProvider from "../session/localStorageProvider";
import errorParser from "../errors/errorParser";
import axios from "axios";

export default function getRequest(url) {
  let token = LSProvider.getToken();
  return axios
    .get(url, {
      headers: { Authorization: "Bearer " + token }
    })
    .then(response => {
      return response.data.data;
    })
    .catch(error => {
      return errorParser(error);
    });
}
