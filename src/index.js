import React from "react";
import ReactDOM from "react-dom";
// import Bootstrap styles
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
//

import registerServiceWorker from "./registerServiceWorker";
// app styles
import "./dest/main.css";
//
import App from "./pages/App";

ReactDOM.render(<App />, document.getElementById("root"));

registerServiceWorker();
