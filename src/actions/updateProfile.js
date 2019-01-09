export default function updateProfile(user) {
  return {
    type: "UPDATE_PROFILE",
    payload: user
  };
}
