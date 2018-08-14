import agent from '../../agent';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Notification from '../Utils/notifications'
import Loading from '../Utils/Loading'
import { BULK_DELETE_USER, DELETE_USER, USER_PAGE_LOADED} from '../../constants/actionTypes';
import {BootstrapTable, TableHeaderColumn, SearchField, DeleteButton} from 'react-bootstrap-table';

const mapStateToProps = state => ({
  ...state.user,
  appName: state.common.appName,
  token: state.common.token,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({type: USER_PAGE_LOADED, payload, skipTracking: true}),
  onBulkDelete: (userIds) =>
      dispatch({type: BULK_DELETE_USER, payload: agent.User.bulkDel(userIds)}),
  onDelete: (userId) =>
    dispatch({type: DELETE_USER, payload: agent.User.del(userId), userId: userId})
});

function rowClassNameFormat(row, rowIdx) {
  return rowIdx % 2 === 0 ? 'td-column-function-even-example' : 'td-column-function-odd-example';
}

class Index extends Component {

  componentWillMount() {
    this.props.onLoad(agent.User.all());
  }

  constructor() {
    super();

    this.rowDelete = (e) => {
      e.stopPropagation();
      if (window.confirm('Are you sure you want remove this user?')) {
        this.props.onDelete(e.target.id);
      }
    };

    this.buttonFormatter = (cell, row) => {
      return (
          <span>
          <Link to={'/users/' + row.id + '/edit'} className="btn-edit">
            <i className="fa fa-edit"/>
          </Link>
          <button className="btn-delete" onClick={this.rowDelete} id={row.id}>
            <i className="fa fa-trash" id={row.id}/>
          </button>
        </span>
      );
    };

    this.createCustomInsertButton = (onClick) => {
      return (
        <Link to="/users/new" className="btn btn-primary">
          <i className="fa fa-plus"/> Add User
        </Link>
      );
    };

    this.createCustomDeleteButton = (onClick) => {
      return (
        <DeleteButton
            btnText='Delete Selected'
            btnContextual='btn-warning'
            btnGlyphicon='fa fa-trash'/>
      );
    };
  }

  confirmDelete = (next, dropRowKeys) => {
    if (window.confirm('Are you sure you want remove user(s)?')) {
      this.props.onBulkDelete(dropRowKeys);
      next();
    }
  };

  createCustomToolBar = props => {
    return (
      <div className="row" style={{width: '100%', marginLeft: '0px'}}>
        <div className='col-xs-6 col-sm-12 col-md-6 col-lg-8'>
          {props.components.btnGroup}
        </div>
        <div className='col-xs-6 col-sm-12 col-md-6 col-lg-4'>
          {props.components.searchPanel}
        </div>
      </div>
    );
  };

  createCustomSearchField = () => {
    return (<SearchField placeholder='Search'/>);
  };

  renderShowsTotal = (start, to, total) => {
    return (
      <p>
        From <span style={{fontWeight: 'bold'}}>{start}</span> to <span style={{fontWeight: 'bold'}}>{to}</span>,
        out of <span style={{fontWeight: 'bold'}}>{total}</span> records
      </p>
    );
  };

  render() {
    const options = {
      toolBar: this.createCustomToolBar,
      insertBtn: this.createCustomInsertButton,
      deleteBtn: this.createCustomDeleteButton,
      handleConfirmDeleteRow: this.confirmDelete,
      searchField: this.createCustomSearchField,
      sizePerPageList: [
        {text: '10', value: 10},
        {text: '25', value: 25},
        {text: '50', value: 50},
        {text: '100', value: 100}
      ], // you can change the dropdown list for size per page
      sizePerPage: 50,  // which size per page you want to locate as default
      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      paginationPosition: 'top'  // default is bottom, top and both is all available
    };
    const selectRow = {
      mode: 'checkbox'
    };

    if (!this.props.users) {return (<Loading/>);}
    return (
      <div>
        <main className='inner-main'>
          <div className="container container-main">
            <div className="portlet-box insportlet-box">
              <div className="portlet-heading">
                <Notification errors={this.props.errors} />
                <Notification message={this.props.message} />
                <div className="row align-items-center">
                  <div className="col-md-6 col-xs-12 col-sm-6">
                    <h2>User Data</h2>
                  </div>
                </div>
              </div>
              <div className="portlet-body admincmnmid">
                <BootstrapTable
                    data={this.props.users}
                    selectRow={selectRow}
                    insertRow
                    deleteRow
                    trClassName={rowClassNameFormat}
                    options={options}
                    version='4'
                    ref="table"
                    search
                    pagination>
                  <TableHeaderColumn className='th-header-string-example' isKey={true}
                                     dataField='id' dataSort={true} export={true}>ID</TableHeaderColumn>
                  <TableHeaderColumn className='th-header-string-example'
                                       dataField='email' dataSort={true} export={true}>Email</TableHeaderColumn>
                  <TableHeaderColumn dataFormat={this.buttonFormatter}>Actions</TableHeaderColumn>
                  </BootstrapTable>
                </div>
              </div>
            </div>
          </main>
        </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);
