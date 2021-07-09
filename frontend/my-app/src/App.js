import React from "react";
import { connect, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import PrivatePage from "./components/PrivatePage";
import PublicPage from "./components/PublicPage";
import PublicPageLogin from "./components/PublicPageLogin";
import TopMenu from "./components/TopMenu";

const mapStateToProps = (state) => {
  return state.authenticationReducer;
};

function App() {
  const history = useHistory();
  const loggedIn = useSelector((state) => state.authenticationReducer.loggedIn);
  let startPage;

  function loginRedirect() {
    history.push("/");
  }

  //LOGGED IN OR NOT
  if (loggedIn) {
    startPage = PublicPageLogin;
  } else {
    startPage = PublicPage;
    loginRedirect();
  }

  return (
    <div className="App">
      <TopMenu />
      <Switch>
        {/* Switch looks for the first path and stops on that */}
        <Route path="/" exact component={startPage} />
        <Route path="/home" component={startPage} />
        <Route path="/inbox" component={PrivatePage} />
      </Switch>
    </div>
  );
}

export default connect(mapStateToProps)(App);
