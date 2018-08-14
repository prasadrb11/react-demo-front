import React from 'react';
import { connect } from 'react-redux';
import Index  from './Index'

import '../Utils/css/react-bootstrap-table-all.min.css'
import '../Utils/css/react-bs-table.css'

const mapStateToProps = state => {
  return {
    appName: state.common.appName,
    currentUser: state.common.currentUser
  }
};

class User extends React.Component {
  render() {
    return (
        <Index/>
    );
  }
}

export default connect(mapStateToProps)(User);
