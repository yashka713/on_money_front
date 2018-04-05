export default function getTokenFromXhr(request) {
  try {
    return {
      client: request.getResponseHeader("client"),
      uid: request.getResponseHeader("uid"),
      tokenType: request.getResponseHeader("token-type"),
      accessToken: request.getResponseHeader("access-token"),
      expiry: request.getResponseHeader("expiry")
    };
  } catch (error) {
    console.error(error);
  }
}
