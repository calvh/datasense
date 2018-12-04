import React from 'react'
import './RegisterForm.css'

export default props => {
  return (
    <div className="card rounded-0">
      <div className="card-header">
        <h3 className="mb-0"> Register </h3>
      </div>
      <div className="card-body">
        <form className="form" role="form" autoComplete="off" id="formRegister" noValidate="" method="POST">
          <div className="form-group">
            <label htmlFor="emailRegister"> Email </label>
            <input
              type="text"
              className="form-control form-control-lg rounded-0"
              name="emailRegister"
              id="emailRegister"
              required=""
            />
            <div className="invalid-feedback"> Oops, you missed this one. </div>
          </div>
          <div className="form-group">
            <label> Password </label>
            <input
              type="password"
              className="form-control form-control-lg rounded-0"
              id="pwdRegister"
              required=""
              autoComplete="new-password"
            />
            <div className="invalid-feedback"> Enter your password too! </div>
          </div>
          <button type="submit" className="btn btn-success btn-lg float-right" id="btnRegister">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}
