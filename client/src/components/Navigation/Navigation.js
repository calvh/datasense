import React from 'react'
import './Navigation.css'
import { slide as Menu } from 'react-burger-menu'
import logo from './../../Data-Sense-Logo.svg'

export default props => {
  return (
    <Menu>
      <h2>
        <img className="center-block heroku" src={logo} alt="logo" />
      </h2>
      <a id="home" className="menu-item" href="/">
        <i className="fas fa-home" /> Home
      </a>
      <a id="login" className="menu-item" href="/login">
        <i className="fas fa-sign-in-alt" /> Login/Register
      </a>
      <a id="dashboard" className="menu-item" href="/dashboard">
        <i className="fas fa-chart-line" /> Dashboard
      </a>
      <a id="settings" className="menu-item" href="/settings">
        <i className="fas fa-cogs" /> Settings
      </a>
      <a id="logout" className="menu-item" href="/logout">
        <i className="fas fa-sign-out-alt" /> Logout
      </a>
    </Menu>
  )
}
