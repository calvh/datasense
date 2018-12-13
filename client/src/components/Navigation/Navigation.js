import React, { Component } from "react";
import "./Navigation.css";
import logo from "./../../DataSenseLogo-NoFont.svg";

class Navigation extends Component {
  render() {
    const inactiveLinkClasses = "nav-link nav-link-item";
    const activeLinkClasses = "nav-link nav-link-item active";

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        {this.props.isLoggedIn ? (
          <a className="navbar-brand" href="/dashboard">
            <div id="logo">
              {" "}
              <img src={logo} alt="logo" /> <span className="title">DataSense</span>
            </div>
          </a>
        ) : (
          <a className="navbar-brand" href="/">
            <div id="logo">
              {" "}
              <img src={logo} alt="logo" /> <span className="title">DataSense</span>
            </div>
          </a>
        )}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbar">
          <ul className="navbar-nav mt-2 mt-lg-0">
            {this.props.isLoggedIn ? (
              <React.Fragment>
                <li className="nav-item">
                  <a className={this.props.path === "/dashboard" ? activeLinkClasses : inactiveLinkClasses} href="/dashboard">
                    <i className="fas fa-chart-line" /> Dashboard{" "}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link nav-link-item" href="/logout">
                    <i className="fas fa-sign-out-alt" /> Logout
                  </a>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="nav-item">
                  <a className={this.props.path === "/" ? activeLinkClasses : inactiveLinkClasses} href="/">
                    <i className="fas fa-home" /> Home{" "}
                  </a>
                </li>
                <li className="nav-item">
                  <a className={this.props.path === "/login" ? activeLinkClasses : inactiveLinkClasses} href="/login">
                    <i className="fas fa-sign-in-alt" /> Login/Register
                  </a>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navigation;
