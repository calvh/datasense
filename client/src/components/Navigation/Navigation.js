import React, { Component } from "react";
import "./Navigation.css";
import logo from "./../../DataSenseLogo-NoFont.svg";

function Navigation(props) {
  if (props.isLoggedIn) {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="/dashboard">
          <div id="logo">
            {" "}
            <img src={logo} alt="logo" /> <span className="title">DataSense</span>
          </div>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
          <ul className="navbar-nav mt-2 mt-lg-0">
            <li className="nav-item">
              <a className="nav-link nav-link-item" href="/dashboard">
                <i className="fas fa-chart-line" /> Dashboard <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-link-item" href="/logout">
                <i className="fas fa-sign-out-alt" /> Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <a className="navbar-brand" href="/">
        <div id="logo">
          {" "}
          <img src={logo} alt="logo" /> <span className="title">DataSense</span>
        </div>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
        <ul className="navbar-nav mt-2 mt-lg-0">
          <li className="nav-item">
            <a className="nav-link nav-link-item" href="/">
              <i className="fas fa-home" /> Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link nav-link-item" href="/login">
              <i className="fas fa-sign-in-alt" /> Login/Register
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
