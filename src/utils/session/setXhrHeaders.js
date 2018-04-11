export default function setXhrHeaders(xhr, token) {
  xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("token-type", token["tokenType"]);
  xhr.setRequestHeader("access-token", token["accessToken"]);
  xhr.setRequestHeader("uid", token["uid"]);
  xhr.setRequestHeader("expiry", token["expiry"]);
  xhr.setRequestHeader("client", token["client"]);
  return xhr;
}
