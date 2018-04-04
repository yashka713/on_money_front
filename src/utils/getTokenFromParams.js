export default function getTokenFromParams(responce) {
  try {
    return {
      client: responce.headers.get("client"),
      uid: responce.headers.get("uid"),
      tokenType: responce.headers.get("token-type"),
      accessToken: responce.headers.get("access-token"),
      expiry: responce.headers.get("expiry")
    };
  } catch (error) {
    console.error(error);
  }
}
