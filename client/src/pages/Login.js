import React, { Component } from "react";
import Navigation from "./../components/Navigation/Navigation";
import LoginForm from "./../components/LoginForm/LoginForm";
import RegisterForm from "./../components/RegisterForm/RegisterForm";
import { Container, Row, Col } from "reactstrap";
import { FormErrors } from "../components/RegisterForm/FormErrors";

class Login extends Component {
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
            <Col md="3" />
            <Col md="6" className="header-top-row">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link shadow active"
                    id="pills-login-tab"
                    data-toggle="pill"
                    href="#pills-login"
                    role="tab"
                    aria-controls="pills-login"
                    aria-selected="true"
                  >
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link shadow"
                    id="pills-register-tab"
                    data-toggle="pill"
                    href="#pills-register"
                    role="tab"
                    aria-controls="pills-register"
                    aria-selected="false"
                  >
                    Register
                  </a>
                </li>
              </ul>
            </Col>
            <Col md="3" />
          </Row>
          <Row>
            <Col md="4">
            <div className="tab-content fade show active">
              <FormErrors />
            </div></Col>
          </Row>
          <Row>
            <Col md="3" />
            <Col md="6">
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-login"
                  role="tabpanel"
                  aria-labelledby="pills-login-tab"
                >
                  <LoginForm history={this.props.history} />
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-register"
                  role="tabpanel"
                  aria-labelledby="pills-register-tab"
                >
                  <RegisterForm history={this.props.history} />
                </div>
              </div>
            </Col>
            <Col md="3" />
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
