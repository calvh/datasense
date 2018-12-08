import React, { Component } from "react";
import Navigation from "./../components/Navigation/Navigation";
import { Container, Row, Col } from "reactstrap";

class Upload extends Component {
  state = {
    accessString: "",
    isLoggedIn: false,
  };

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
      </div>
    );
  }
}

export default Upload;
