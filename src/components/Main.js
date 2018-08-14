import React, { Component } from "react";
import {Route, NavLink, Switch, Router} from "react-router-dom";
import agent from '../agent';
import {store, history} from '../store';
import { connect } from 'react-redux';
import {push} from 'react-router-redux';
import ProtectedRoute from '../components/Utils/ProtectedRoute'
import Home from "../components/Utils/Home";
import SignUp from "../components/SignUp/SignUp";
import User from "../components/User/User";
import AddUser from "../components/User/new";
import EditUser from "../components/User/edit";
import {APP_LOAD, REDIRECT, LOGOUT} from '../constants/actionTypes';

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }
};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({type: APP_LOAD, payload, token, skipTracking: true}),
  onClickLogout: () => dispatch({type: LOGOUT}),
  onRedirect: () =>
    dispatch({type: REDIRECT})
});

class Main extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }
  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }
    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }
  render() {
    const currentUser = this.props.currentUser;
    if (this.props.appLoaded) {
      return (
        <Router history={history}>
          <div>
            <h1>Demo</h1>
            <ul className="header">
              <li><NavLink exact to="/">Home</NavLink></li>
              {!currentUser &&
                <li><NavLink exact to="/sign_up">SignUp</NavLink></li>
              }
              {currentUser && currentUser.role === 'admin' &&
                <li><NavLink exact to="/users">Users</NavLink></li>
              }
              {currentUser &&
                <li><NavLink exact to="#" onClick={this.props.onClickLogout}>Logout</NavLink></li>
              }
            </ul>
            <div className="content">
              <Switch>
                <Route path="/sign_up" component={SignUp}/>
                <ProtectedRoute exact path="/users/new" component={AddUser} userRole="admin"/>
                <ProtectedRoute exact path="/users/:id/edit" component={EditUser}  userRole="admin"/>
                <ProtectedRoute exact path="/users" component={User}  userRole="admin"/>
                <Route path="/" component={Home}/>
              </Switch>
            </div>
          </div>
        </Router>
      );
    }
    return (
      <div/>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);