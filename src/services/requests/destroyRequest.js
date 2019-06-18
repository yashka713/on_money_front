import LSProvider from "../session/localStorageProvider";
import errorParser from "../errors/errorParser";
import axios from "axios";

export default function destroyRequest(url) {
  let token = LSProvider.getToken();
  return axios
    .delete(url, {
      headers: { Authorization: "Bearer " + token }
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      return errorParser(error);
    });
}
