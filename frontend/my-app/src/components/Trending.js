import React, { Component } from "react";
import "../styles/Trending.css";
import TrendingPost from "./TrendingPost";

class Trending extends Component {
  render() {
    return (
      <div className="main-wrapper-trending">
        <div className="trending-today">
          <div className="header-trending-today">
            <p id="header-trending-today">Trending Today</p>
          </div>
          <div className="posts-trending-today">
            <TrendingPost />
            <TrendingPost />
            <TrendingPost />
            <TrendingPost />
          </div>
        </div>

        <div className="trending-yesterday">
          <div className="header-trending-yesterday">
            <p id="header-trending-yesterday">Trending Yesterday</p>
          </div>
          <div className="posts-trending-yesterday">
            <TrendingPost />
            <TrendingPost />
            <TrendingPost />
            <TrendingPost />
          </div>
        </div>
      </div>
    );
  }
}

export default Trending;
