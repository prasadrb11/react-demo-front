import React, { Component } from "react";
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../../constants/actionTypes';
import Notification from "../Utils/notifications"; 
const mapStateToProps = state => {
  return {
    ...state.auth,
    appName: state.common.appName,
    projectName: state.common.projectName
  }
};

const mapDispatchToProps = dispatch => ({
  onChangeName: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'name', value }),
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password, confirmPassword) => {
    const payload = agent.Auth.register(email, password, confirmPassword);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class SignUp extends Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email,password, confirmPassword) => ev => {
      if (document.getElementById('inputPassword').value ===
        document.getElementById('inputPasswordConfirmation').value) {
        ev.preventDefault();
        this.props.onSubmit(email,password, confirmPassword);
      } else {
        alert("Password Not Matched");
        document.getElementById("inputPasswordConfirmation").focus();
        ev.preventDefault();
      }
    }
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    const confirmPassword = this.props.password_confirmation;

    return (
      <div>
        <Notification errors={this.props.errors} />
        <form id="signup_form" autoComplete="false" onSubmit={this.submitForm( email,password, confirmPassword)}>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <div className="input-field">
                  <input type="email"
                         onChange={this.changeEmail}
                         id="inputEmail"
                         className="form-control"
                         placeholder="Email address"
                         required="true" />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <div className="input-field">
                  <input type="password"
                         onChange={this.changePassword}
                         id="inputPassword"
                         className="form-control"
                         placeholder="Password"
                         required="true"/>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <div className="input-field">
                  <input type="password"
                         onChange={this.changePassword}
                         id="inputPasswordConfirmation"
                         className="form-control"
                         placeholder="Password Confirmation"
                         required="true"/>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="form-action">
                <input type="submit"
                       value="Sign Up"
                       className="btn btn-dark"
                       data-category="signin-main-button_new"
                       data-action="click"
                       data-label="Submit-form"
                       disabled={this.props.inProgress}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

// export default SignUp;
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);