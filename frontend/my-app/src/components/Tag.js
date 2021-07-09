import React, { Component } from "react";
import { AiOutlineTag } from "react-icons/ai";
import "../styles/Tag.css";

class Tag extends Component {
  render() {
    return (
      <div className="main-wrapper-tag">
        <AiOutlineTag id="tag_symbol" size="22" />
        <div className="tag-wrapper">
          <p id="tag_name">A test Tag</p>
        </div>
      </div>
    );
  }
}

export default Tag;
