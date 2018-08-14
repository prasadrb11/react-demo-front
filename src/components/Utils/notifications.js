import React, {Component} from 'react';
import $ from 'jquery'
import {connect} from "react-redux"
import {
  NOTIFICATION_UNLOADED
} from '../../constants/actionTypes';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onNotificationClose: () => {
    dispatch({type: NOTIFICATION_UNLOADED})
  }
});

class Notification extends Component {

  hideAlert = (e) => {
    e.preventDefault();
    $('.alert').slideUp(300);
    this.props.onNotificationClose();
  };

  render() {
    const errors = this.props.errors;
    const message = this.props.message;
    const dontHide = this.props.dontHide;
    if (errors) {
      return (
        <div className="alert alert-danger">
            <a className="close" onClick={this.hideAlert} aria-label="close">&times;</a>
            {
              Object.keys(errors).map(key => {
                $('.alert').show();
                return (
                  <span key={key}>
                    <span>{errors[key]}</span>
                  </span>
                );
              })
            }
        </div>
      );
    }
    if (message) {
      $('.alert').show();
      return (
        <div className="alert alert-success">
            {!dontHide && <a className="close" onClick={this.hideAlert} aria-label="close">&times;</a>}
            <span>{message}</span>
        </div>
      );
    }
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
