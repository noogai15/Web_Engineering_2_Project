import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../images/logo_small.png";
import "../styles/TopMenu.css";

function mapStateToProps(state) {
  return state;
}

function TopMenu(props) {
  let user = props.authenticationReducer.user;
  let loggedIn = props.authenticationReducer.loggedIn;
  let userStatus = "";
  if (loggedIn && user.isAdministrator) {
    userStatus = "Admin";
  } else if (loggedIn) {
    userStatus = "User";
  }
  return (
    <div className="main-wrapper-top-menu">
      <Link to="/">
        <img src={logo} alt="geogate_logo" id="logo" />
      </Link>
      <span id="userStatus">{userStatus}</span>
    </div>
  );
}

const ConnectedTopMenu = connect(mapStateToProps, null)(TopMenu);

export default ConnectedTopMenu;
