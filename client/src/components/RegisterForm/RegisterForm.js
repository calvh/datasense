import React, { Component } from "react";
import "./RegisterForm.css";
import API from "../../utils/API";

class RegisterForm extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  registerUser = e => {
    e.preventDefault();
    if (this.state.email === "" || this.state.password === "") {
      // TODO implement error display
    } else {
      API.registerUser(this.state.email, this.state.password)
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
      <div className="card rounded-0">
        <div className="card-header">
          <h3 className="mb-0"> Register </h3>
        </div>
        <div className="card-body">
          <form
            className="form"
            role="form"
            autoComplete="off"
            id="formRegister"
            noValidate=""
            method="POST"
            onSubmit={this.registerUser}
          >
            <div className="form-group">
              <label htmlFor="emailRegister"> Email </label>
              <input
                type="text"
                className="form-control form-control-lg rounded-0"
                name="emailRegister"
                id="emailRegister"
                required=""
                value={this.state.email}
                onChange={this.handleChange("email")}
              />
              <div className="invalid-feedback">
                {" "}
                Oops, you missed this one.{" "}
              </div>
            </div>
            <div className="form-group">
              <label> Password </label>
              <input
                type="password"
                className="form-control form-control-lg rounded-0"
                id="pwdRegister"
                required=""
                autoComplete="new-password"
                value={this.state.password}
                onChange={this.handleChange("password")}
              />
              <div className="invalid-feedback"> Enter your password too! </div>
            </div>
            <button
              type="submit"
              className="btn btn-success btn-lg float-right"
              id="btnRegister"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
