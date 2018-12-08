import React, { Component } from 'react'
import Navigation from './../components/Navigation/Navigation'
import Slider from './../components/Slider/Slider'

class Home extends Component {
  state = {
    accessString: "",
    isLoggedIn: false,
  }

  componentDidMount() {
    const accessString = localStorage.getItem("JWT");
    if (!accessString) {
      this.setState({
        isLoggedIn: false,
      });
    } else {
      this.setState({
        accessString,
        isLoggedIn: true,
      });
    }
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
