import React from "react";
import profPic from "../images/prof_pic_no_user.png";
import "../styles/PublicPage.css";
import ContentPost from "./ContentPost";
import Locations from "./Locations";
import Tag from "./Tag";
import Trending from "./Trending";
import UserRegisterWidget from "./UserRegisterWidget";
import UserSessionWidget from "./UserSessionWidget";

//implement HTML
//impelement/import CSS
//Once HTML is implemented, fix tags and sytax etc. accordingly
function PublicPage() {
  return (
    <div className="main-wrapper">
      <div className="left-sidebar">
        <div className="user-corner">
          <img src={profPic} alt="prof_pic_no_login" id="prof_pic" />
          <div className="welcome-corner">
            <div className="welcome-header">
              <h3>WELCOME</h3>
            </div>
            <div className="login-signin">
              <UserSessionWidget />
              <UserRegisterWidget />
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

export default PublicPage;
