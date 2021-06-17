import React, { Component } from "react";

import { connect } from "react-redux";

import "./App.css";
import TopMenu from "./components/TopMenu";
import PublicPage from "./components/PublicPage";
import PrivatePage from "./components/PrivatePage";

const mapStateToProps = (state) => {
  return state;
};

class App extends Component {
  render() {
    const user = this.props.user;
    let workspace;

    //LOGGED IN OR NOT
    if (user) {
      workspace = <PrivatePage />;
    } else {
      workspace = <PublicPage />;
    }

    return (
      <div className="App">
        <TopMenu />
        {workspace}
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
