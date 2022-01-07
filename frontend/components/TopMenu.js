import React from "react";
import { Link } from "react-router-dom";
import "../styles/TopMenu.css";

function TopMenu(props) {
  return (
    <div className="main-wrapper-top-menu">
      <Link to="/">
        <img src={logo} alt="geogate_logo" id="logo" />
      </Link>
      <span id="userStatus">{userStatus}</span>
    </div>
  );
}
