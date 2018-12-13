import React, { Component } from "react";
import "./RegisterForm.css";
import API from "../../utils/API";

class RegisterForm extends Component {
  state = {
    email: "",
    password: "",
    emailValid: true,
    emailError: "",
    passwordValid: true,
    passwordError: "",
    isLoading: false,
  };

  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState(state => {
      return {
        [name]: value,
        emailValid: true,
        emailError: "",
        passwordValid: true,
        passwordError: "",
      };
    });
  };

  registerUser = event => {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      this.setState({ isLoading: true });
      API.registerUser(this.state.email, this.state.password)
        .then(response => {
          this.setState({ isLoading: false });
          if (response.data.token) {
            localStorage.setItem("JWT", response.data.token);
            this.props.history.push("/dashboard");
          }
        })
        .catch(err => {
          this.setState({ isLoading: false });
          switch (err.response.status) {
            case 500: {
              return alert("An error occurred. Try refreshing the page.");
            }
            case 409: {
              if (err.response.data.authError === "email") {
                return this.setState({
                  emailValid: false,
                  emailError: "Sorry, this email is already taken",
                });
              }
            }
            case 400: {
              if (err.response.data.validateError) {
                const emailError = err.response.data.validateError.email
                  ? err.response.data.validateError.email[0]
                  : "";
                const passwordError = err.response.data.validateError
                  .password[0]
                  ? err.response.data.validateError.password[0]
                  : "";
                return this.setState({
                  emailValid: emailError ? false : true,
                  emailError,
                  passwordValid: passwordError ? false : true,
                  passwordError,
                });
              }
              return this.setState({
                emailValid: false,
                emailError: "Please check your email and try again",
                passwordValid: false,
                passwordError: "Please check your password and try again",
              });
            }
          }
        });
    } else {
      if (!this.state.email) {
        this.setState({
          emailValid: false,
          emailError: "Email is required",
        });
      }

      if (!this.state.password) {
        this.setState({
          passwordValid: false,
          passwordError: "Password is required",
        });
      }
    }
  };

  render() {
    const validInputClasses = "form-control form-control-lg rounded-0";
    const invalidInputClasses =
      "form-control form-control-lg rounded-0 is-invalid";

    return (
      <div>
        <div className="card rounded-0">
          <div className="card-header">
            <h3 className="mb-0">Register</h3>
          </div>
          <div className="card-body">
            <form className="form" autoComplete="off" noValidate="">
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Email"
                  className={
                    this.state.emailValid
                      ? validInputClasses
                      : invalidInputClasses
                  }
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <small className="form-text text-danger">
                  {this.state.emailError}
                </small>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="Password"
                  className={
                    this.state.passwordValid
                      ? validInputClasses
                      : invalidInputClasses
                  }
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <small className="form-text text-danger">
                  {this.state.passwordError}
                </small>
              </div>
              <button
                className="btn btn-success btn-lg float-right"
                onClick={this.registerUser}
                disabled={!this.state.emailValid || !this.state.passwordValid}
              >
                {this.state.isLoading ? "Loading..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
