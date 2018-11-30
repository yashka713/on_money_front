import LSProvider from "../session/localStorageProvider";
import getUserInfoFromPromise from "../session/getTokenFromPromise";
import axios from "axios";
import Api from "../../api/Api";
import errorParser from "../errors/errorParser";

export async function checkUserRequest() {
  try {
    let token = LSProvider.getToken();
    if (token !== null && token !== undefined) {
      return await axios
        .get(Api.checkUserPath(), {
          headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
          let performedResponce = getUserInfoFromPromise(response);
          LSProvider.saveToken(performedResponce["jwt"]);
          return performedResponce;
        })
        .catch(error => {
          console.log(error);
          localStorage.clear();
          return errorParser(error);
        });
    }
    return await new Promise(() => {
      return {
        status: 0,
        current_user: {}
      };
    });
  } catch (error) {
    console.error(error);
  }
}
