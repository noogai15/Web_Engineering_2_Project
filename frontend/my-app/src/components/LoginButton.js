import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux"; //Connecting components with Redux

import { getShowLoginDialogAction } from "../actions/AuthenticationActions";

class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.showLoginDialog = this.showLoginDialog.bind(this);
  }
  showLoginDialog() {
    const dispatch = this.props.dispatch;
    dispatch(getShowLoginDialogAction());
  }

  render() {
    return (
      <div>
        <Button variant="light" onClick={this.showLoginDialog}>
          Login
        </Button>
      </div>
    );
  }
}

export default connect()(LoginButton);
