import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    appName: state.common.appName,
    currentUser: state.common.currentUser
  }
};

class Loading extends Component {
  render() {
    return (
        <main className='inner-main'>
          <div className="container container-main">
            <div>Loading...</div>
          </div>
        </main>
    );
  }
}

export default connect(mapStateToProps)(Loading);