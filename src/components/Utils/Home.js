import React, { Component } from "react";
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  REGISTER_PAGE_UNLOADED
} from '../../constants/actionTypes';
import Notification from "../Utils/notifications";

const mapStateToProps = state => {
  return {
    ...state.auth,
    appName: state.common.appName,
    projectName: state.common.projectName,
    currentUser: state.common.currentUser
  }
};

const mapDispatchToProps = dispatch => ({
  onChangeName: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'name', value }),
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password, grant_type) => {
    const payload = agent.Auth.login(email, password, grant_type);
    dispatch({ type: LOGIN, payload: payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});



class Home extends Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password, grant_type) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password, grant_type);
    }
  }

  render() {
    const emailAddress = this.props.email;
    const password = this.props.password;
    const grant_type = 'password';
    const token = window.localStorage.getItem('jwt');
    return (
      <div>
        {token &&
        <h1>{'Welcome <' + this.props.currentUser.email + '>!!'}</h1>
        }
        {!token &&
        <div>
          <Notification errors={this.props.errors} />
            <form onSubmit={this.submitForm(emailAddress, password, grant_type)}>
              <div className="row">
                <div className="col-md-5">
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
                <div className="col-md-5">
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
                <div className="col-md-2">
                  <div className="form-action">
                    <input type="submit"
                          value="Login"
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
        }
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
//export default connect(mapStateToProps, mapDispatchToProps)(Home);