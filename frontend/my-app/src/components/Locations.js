import React, { Component } from "react";
import { MdLocationOn } from "react-icons/md";
import "../styles/Locations.css";

class Locations extends Component {
  render() {
    return (
      <div className="main-wrapper-locations">
        <MdLocationOn id="locations_symbol" size="22" />
        <div className="locations-wrapper">
          <p id="locations_name">A test location</p>
        </div>
      </div>
    );
  }
}

export default Locations;
