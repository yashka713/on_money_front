export default function errorParser(error) {
  var parsedError = {};
  if (error.response) {
    parsedError["status"] = error.response.status;
    if (error.response.data !== "") {
      parsedError["body"] = error.response.data.errors.map(err => {
        return {
          pointer: err.source.pointer,
          detail: err.detail
        };
      });
    } else {
      parsedError["body"] = new Array({ detail: error.response.statusText });
    }
  } else {
    parsedError = {
      status: 0,
      current_user: {}
    };
  }
  return parsedError;
}
