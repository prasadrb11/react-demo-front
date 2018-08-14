import agent from '../../agent';
import React from 'react';
import {connect} from 'react-redux';
import Notification from '../Utils/notifications'
import {
  UPDATE_FIELD_USER,
  USER_PAGE_UNLOADED,
  ADD_USER,
  USER_PAGE_LOADED
} from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.user,
  appName: state.common.appName,
  token: state.common.token,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
      dispatch({type: USER_PAGE_LOADED, payload, skipTracking: true}),
  onChange: (key, value) =>
      dispatch({type: UPDATE_FIELD_USER, key: key, value}),
  onSubmit: (user) => {
    dispatch({type: ADD_USER, payload: agent.User.create(user)})
  },
  onUnload: () =>
      dispatch({type: USER_PAGE_UNLOADED})
});

class NewUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: ''
    };
    this.submitForm = (user) => ev => {
      ev.preventDefault();
      this.props.onSubmit(user);
    }
  }

  onChange = (ev) => {
    this.props.onChange(ev.target.name, ev.target.value);
    const state = this.state;
    state[ev.target.name] = ev.target.value;
    this.setState(state);
  };

  onCancelButton = (e) => {
    if(window.confirm('Are you sure you want to cancel? All data will be lost.')){
      window.location.href = '/users';
    }
  };

  render() {
    return (
      <main className="inner-main">
        <section>
          <div className='container container-main'>
            <div className="portlet-box">
              <div className="portlet-heading">
                <Notification errors={this.props.errors}/>
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <h2>Add User</h2>
                  </div>
                </div>
              </div>

              <div className="portlet-body">
                <form className="form" autoComplete="off" onSubmit={this.submitForm(this.state)}>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <div className="input-field">
                              <input type="text" className="form-control" name="email" placeholder="Email Address"
                                     onChange={this.onChange} required='true'/>
                              <span className="input-focus-effect"/>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <div className="input-field">
                              <input type="password" className="form-control" name="password" placeholder="Password"
                                     onChange={this.onChange} required='true'/>
                              <span className="input-focus-effect"/>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <div className="input-field">
                              <input type="password" className="form-control" name="password_confirmation"
                                     placeholder="Password Confirmation" onChange={this.onChange} required='true'/>
                              <span className="input-focus-effect"/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-12">
                      <div className="btn-set text-left">
                        <button className="btn btn-dark btn-lg btn-space" type="submit">Add User</button>
                        <button className="btn btn-light btn-lg" onClick={ this.onCancelButton }>Cancel</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
