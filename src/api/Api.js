export default {
  checkUserPath() {
    return process.env.REACT_APP_API_HOST + "sessions/check_user";
  },
  startSessionPath() {
    return process.env.REACT_APP_API_HOST + "sessions";
  },
  registerUserPath() {
    return process.env.REACT_APP_API_HOST + "profiles/registration";
  },
  profilesPath() {
    return process.env.REACT_APP_API_HOST + "profiles";
  }
};
