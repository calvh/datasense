import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'

class App extends Component {
  render() {
    const pea = "rrtt" // remove after
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/abc" render={(props)=>(<p>Hi i am render component{pea}</p>)} /> 
          
        </Switch>
      </Router>
    )
  }
}

export default App
