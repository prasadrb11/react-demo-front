import agent from '../../agent';
import React from 'react';
import {connect} from 'react-redux';
import Notification from '../Utils/notifications'
import {
  UPDATE_FIELD_USER,
  UPDATE_USER,
  GET_USER
} from '../../constants/actionTypes';
import Loading from "../Utils/Loading";

const mapStateToProps = state => ({
  ...state.user,
  appName: state.common.appName,
  token: state.common.token,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({type: GET_USER, payload, skipTracking: true}),
  onChange: (key, value) =>
    dispatch({type: UPDATE_FIELD_USER, key: key, value}),
  onSubmit: (user_id, user) => {
    dispatch({type: UPDATE_USER, payload: agent.User.update(user_id, user)})
  },
  onUnload: () =>
    dispatch({type: UPDATE_USER})
});

class UpdateUser extends React.Component {

  componentDidMount() {
    this.props.onLoad(agent.User.get(this.props.match.params.id));
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: ''
    };
    this.submitForm = (user) => ev => {
      ev.preventDefault();
      this.props.onSubmit(this.props.match.params.id, user);
    }
  }

  onChange = (ev) => {
    this.props.onChange(ev.target.name, ev.target.value);
    const state = this.state;
    state[ev.target.name] = ev.target.value;
    this.setState(state);
  };

  onCancelButton = (e) => {
    if(window.confirm('Are you sure you want to cancel? All data will be lost.')) {
      this.props.history.go(-1)
    }
  };

  render() {
    const user = this.props.user;
    if (!this.props.user) {
      return (
          <Loading/>
      );
    } else {
      if(this.state.email === '')
          this.setState(user);
      const {
        email, password, password_confirmation
      } = this.state;
      delete this.state.id;
      return (
        <main className="inner-main">
          <section>
            <div className="container container-main">
              <div className="portlet-box">
                <div className="portlet-heading">
                  <Notification errors={this.props.errors}/>
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h2>Update User</h2>
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
                                       onChange={this.onChange} required='true' value={email}/>
                                <span className="input-focus-effect"/>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <div className="input-field">
                                <input type="password" className="form-control" name="password" placeholder="Password"
                                       onChange={this.onChange} value={password}/>
                                <span className="input-focus-effect"/>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <div className="input-field">
                                <input type="password" className="form-control" name="password_confirmation"
                                       placeholder="Password Confirmation" onChange={this.onChange}
                                       value={password_confirmation}/>
                                <span className="input-focus-effect"/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-12">
                        <div className="btn-set text-left">
                          <button className="btn btn-dark btn-lg btn-space" type="submit">Update User</button>
                          <button className="btn btn-light btn-lg" onClick={this.onCancelButton}>Cancel</button>
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
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
