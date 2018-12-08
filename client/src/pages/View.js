import React, { Component } from "react";
import Navigation from "./../components/Navigation/Navigation";
import { Container, Row, Col } from "reactstrap";
//import Charts from "../components/Charts/Charts";

class View extends Component {
  state = {
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
        isLoggedIn: true,
      });
    }
  }

//  dashboard/datasets/:id
  render() {
    return (
      <div>
        <Navigation isLoggedIn={this.state.isLoggedIn} />
        <Container fluid>
          <Row>
            {/* TODO: create 2 sections: 1 for input data and 2nd for charts display */}
            {/* <Charts /> */}
            display here
          </Row>
        </Container>
      </div>
    );
  }
}

export default View;
