export default function setXhrHeaders(token) {
  let headers = new Headers();
  headers.append("Content-type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("token-type", token["tokenType"]);
  headers.append("access-token", token["accessToken"]);
  headers.append("uid", token["uid"]);
  headers.append("expiry", token["expiry"]);
  headers.append("client", token["client"]);
  return headers;
}
