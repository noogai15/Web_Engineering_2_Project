import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../images/logo_small.png";
import "../styles/TopMenu.css";

//TODO: Logout Button (Route to PublicPage)

function mapStateToProps(state) {
  return state;
}

function TopMenu(props) {
  let isAdmin = props.authenticationReducer.user.isAdministrator;
  let userStatus = "User";
  if (isAdmin) {
    userStatus = "Admin";
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
