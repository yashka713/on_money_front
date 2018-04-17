import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTh from "@fortawesome/fontawesome-free-solid/faTh";
import { connect } from "react-redux";

import LogoutComponent from "../../components/mainPage/Logout";
import UserProfile from "./UserProfile";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.burgerToggle = this.burgerToggle.bind(this);
  }
  burgerToggle() {
    let linksEl = document.querySelector(".narrowLinks");
    if (linksEl.style.display === "block") {
      linksEl.style.display = "none";
    } else {
      linksEl.style.display = "block";
    }
  }
  render() {
    return (
      <nav className="container">
        <div className="navWide">
          <div className="wideDiv">
            <div className="nav-header">
              <div className="nav-item">
                <h3>Hello, {this.props.current_user.name || "anonymous"}</h3>
              </div>
              <div className="nav-item">
                <UserProfile />
              </div>
              <div className="nav-item">Link 3</div>
            </div>
            <div className="nav-item nav-right">
              <LogoutComponent />
            </div>
          </div>
        </div>
        <div className="navNarrow">
          <div className="burger-user">
            {this.props.current_user.name || "anonymous"}
          </div>
          <FontAwesomeIcon
            icon={faTh}
            className="cursor-pointer burger-right"
            onClick={this.burgerToggle}
            size="2x"
            color="white"
          />
          <div className="narrowLinks">
            <div onClick={this.burgerToggle}>Link 1</div>
            <UserProfile />
            <LogoutComponent />
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(state => ({
  current_user: state.current_user
}))(Navbar);
