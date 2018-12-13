import React, { Component } from "react";
import "./RegisterForm.css";
import API from "../../utils/API";
//import { FormErrors } from './FormErrors';

class RegisterForm extends Component {
  state = {
    email: "",
    password: "",
    emailValid: false,
    passwordValid: false,
    formValid: false,
    formErrors: {email: '', password: ''},
  };

  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    console.log(event.target.value);

    this.validateField(name, value);
    this.validateForm();
    this.setState(state => {
      return {[name]: value}
      }
     );
  };
  
  validateField = (fieldname, value) => {
    let emailValid ;
    let passwordValid ;
    let formErrors = {};
    console.log(value);
    switch(fieldname) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = emailValid ? " ": "Please enter a valid Email address";
        break;

      case 'password':
        passwordValid = value.length >= 6;
        formErrors.password = passwordValid? "": "Password is too short";
        break;

      default:
        break;
    }
    this.setState({ emailValid, 
                    passwordValid,
                    formErrors
                  });   
  }
  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    console.log(this.state.formValid);
  }

  registerUser = e => {
    e.preventDefault();
    
    //if (this.state.email === "" && this.state.password === "") {
    //}  
    
    //else {
      API.registerUser(this.state.email, this.state.password)
        .then(response => {
          console.log(response.data);
          if (!response.data.token) {
            //redundant
          } else {
            localStorage.setItem("JWT", response.data.token);
            this.props.history.push("/dashboard");
          }
        })
        .catch(err => {
          console.log(err.data);
        });
    //}
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
                type="email"
                  className="form-control form-control-lg rounded-0"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
              />
              <small className="form-text text-danger">{this.state.formErrors.email}</small>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-lg rounded-0"
                  autoComplete="new-password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
              <small className="form-text text-danger">{this.state.formErrors.password}</small>
            </div>
            <button
              type="submit"
              className="btn btn-success btn-lg float-right"
              id="btnRegister"
              disabled={!this.state.formValid}
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
