import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import View from "./pages/View";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/view/:id" component={View} />
          <Route
            exact
            path="/logout"
            render={() => {
              localStorage.removeItem("JWT");
              return <Redirect to="/" />;
            }}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
