import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux"; //Connecting components with Redux

class ProfileButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Button variant="dark" />
      </div>
    );
  }
}

export default connect()(ProfileButton);
