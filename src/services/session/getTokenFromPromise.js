export default function getUserInfoFromPromise(response) {
  try {
    return {
      status: response.status,
      jwt: response.data.data.attributes["jwt"],
      current_user: {
        id: response.data.data.id,
        email: response.data.data.attributes.email,
        name: response.data.data.attributes.name,
        nickname: response.data.data.attributes.nickname
      }
    };
  } catch (error) {
    console.error(error);
  }
}
