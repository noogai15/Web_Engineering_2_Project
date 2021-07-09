import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as authenticationActions from "../actions/AuthenticationActions";
import profPic from "../images/userProfPic.png";
import "../styles/PublicPage.css";
import ContentPost from "./ContentPost";
import Locations from "./Locations";
import Tag from "./Tag";
import Trending from "./Trending";
import UserEditWidget from "./UserEditWidget";

//implement HTML
//impelement/import CSS
//Once HTML is implemented, fix tags and sytax etc. accordingly

function mapStateToProps(state) {
  return state.authenticationReducer;
}

function PublicPageLogin(props) {
  const user = useSelector(
    (state) => state.authenticationReducer.user.userName
  );
  const [loggedInUser, setLoggedInUser] = useState(user);

  function handleLogout() {
    const logout = props.logout;
    logout();
  }

  return (
    <div className="main-wrapper">
      <div className="left-sidebar">
        <div className="user-corner">
          <img src={profPic} alt="profile Pic" id="prof_pic" />
          <div className="welcome-corner">
            <div className="welcome-header">
              <h3>WELCOME</h3>
              <h4>{loggedInUser}</h4>
              <Link to="/">
                <Button onClick={handleLogout}>LOG OUT</Button>
              </Link>
              <Link
                to="/inbox"
                className="profile-link"
                style={{ textDecoration: "none" }}
              >
                <h5>PRIVATE PAGE</h5>
              </Link>
              <UserEditWidget />
            </div>
          </div>
        </div>

        <div className="tags-container">
          <div className="tags-header">
            <h4>Include Tags</h4>
          </div>
          <Tag />
          <Tag />
          <Tag />
        </div>

        <div className="locations-container">
          <div className="locations-header">
            <h4>Locations</h4>
          </div>
          <Locations />
          <Locations />
          <Locations />
          <Locations />
        </div>
      </div>
      <div className="main-content">
        <ContentPost />
        <ContentPost />
        <ContentPost />
        <ContentPost />
        <ContentPost />
        <ContentPost />
      </div>
      <div className="right-sidebar">
        <Trending />
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(authenticationActions.getLogoutAction()),
  };
}

const ConnectedPublicPageLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicPageLogin);

export default ConnectedPublicPageLogin;
