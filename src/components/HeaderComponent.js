import React, { Component } from "react";
import "../styles/HeaderComponent.css";
import SignUpForm from "../forms/SignUpForm";
import ComeInModal from "./ComeInModal";

class HeaderComponent extends Component {
  render() {
    return (
      <div className="header">
        <SignUpForm />
        <ComeInModal />
      </div>
    );
  }
}

export default HeaderComponent;
