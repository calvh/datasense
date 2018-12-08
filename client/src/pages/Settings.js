import React, { Component } from "react";
import Navigation from "./../components/Navigation/Navigation";
import { Container, Row, Col } from "reactstrap";

class Settings extends Component {
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
        <Container fluid>
          <Row>
            <Col md="12">Settings</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Settings;
