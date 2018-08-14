import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    appName: state.common.appName,
    currentUser: state.common.currentUser
  }
};

class ProtectedRoute extends Component {
  render() {
   const { component: Component, ...props} = this.props;
    return (
      <Route
        {...props}
        render={props => (
            (this.props.currentUser && this.props.userRole === this.props.currentUser.role) ?
            <Component {...props} /> :
            <Redirect to='/' />
        )}
      />
    )
  }
}
export default connect(mapStateToProps)(ProtectedRoute);