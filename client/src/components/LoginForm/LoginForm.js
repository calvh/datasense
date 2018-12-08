import React, { Component } from "react";
import "./LoginForm.css";
import API from "../../utils/API";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  loginUser = e => {
    e.preventDefault();
    if (this.state.email === "" || this.state.password === "") {
      // TODO implement error display
    } else {
      API.loginUser(this.state.email, this.state.password)
        .then(response => {
          console.log(response.data);
          if (!response.data.token) {
            // TODO implement error dipslay
          } else {
            localStorage.setItem("JWT", response.data.token);
            this.props.history.push("/dashboard");
          }
        })
        .catch(err => {
          console.log(err.data);
        });
    }
  };

  render() {
    return (
      <div>
        <div className="card rounded-0">
          <div className="card-header">
            <h3 className="mb-0">Login</h3>
          </div>
          <div className="card-body">
            <form
              className="form"
              role="form"
              autoComplete="off"
              id="formLogin"
              noValidate=""
              method="POST"
              onSubmit={this.loginUser}
            >
              <div className="form-group">
                <label htmlFor="emailLogin">Email</label>
                <input
                  type="text"
                  className="form-control form-control-lg rounded-0"
                  name="emailLogin"
                  id="emailLogin"
                  required=""
                  value={this.state.email}
                  onChange={this.handleChange("email")}
                />
                <div className="invalid-feedback">
                  Oops, you missed this one.
                </div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg rounded-0"
                  id="pwdLogin"
                  required=""
                  autoComplete="new-password"
                  value={this.state.password}
                  onChange={this.handleChange("password")}
                />
                <div className="invalid-feedback">Enter your password too!</div>
              </div>
              <button
                type="submit"
                className="btn btn-success btn-lg float-right"
                id="btnLogin"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
