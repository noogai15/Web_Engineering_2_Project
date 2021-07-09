import React, { Component } from "react";
import { FcLike } from "react-icons/fc";
import { BiCommentDots } from "react-icons/bi";

import "../styles/ContentPost.css";

class ContentPost extends Component {
  render() {
    return (
      <div className="main-wrapper-post">
        <div className="like-container">
          <span id="like_number">8.8k</span>
          <FcLike id="like_symbol" size="20px" />
        </div>
        <div className="post-container">
          <span id="post-op">DmSkrt</span>
          <h5 id="post-title">Meine Erfahrungen am Kronenburger See</h5>
          <span id="time-posted">vor zwei Tagen</span>
        </div>

        <div className="comments-container">
          <BiCommentDots id="comments-symbol" size="22" />
        </div>
      </div>
    );
  }
}

export default ContentPost;
