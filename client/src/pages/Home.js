import React, { Component } from 'react'
import Navigation from './../components/Navigation/Navigation'
import Slider from './../components/Slider/Slider'

class Home extends Component {
  state = {
    isLoggedIn: true,
  }

  render() {
    return (
      <div>
        <Navigation isLoggedIn={this.state.isLoggedIn} />
        <Slider />
        <main id="page-wrap" />
      </div>
    )
  }
}

export default Home
