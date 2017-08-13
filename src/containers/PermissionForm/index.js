/*jshint esversion: 6*/
import React, {Component} from 'react';
import { addBoardUser } from '../../actions';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import './PermissionForm.css';

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      permission: 'Base'
    };
  }

  addBoardUser = (event) => {
    event.preventDefault();
    this.props.addBoardUser(this.createUserObject(this.state));
    this.reset();
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  createUserObject(stateObj) {
    return {
      UserEmail: stateObj.email,
      permission: stateObj.permission,
      BoardId: this.props.location.pathname.split('/board/')[1],
    };
  }

  reset() {
    this.setState({
      email: '',
      permission: 'Base'
    });
  }

  render() {
    return (
      <div
        className="permission-form"
      >
        <h3>Add Users!</h3>
        <input
          type="text"
          placeholder="Enter Email"
          onChange={this.handleChange}
          value={this.state.email}
          id="email-input"
          className="cardInputs"
          name="email"
          />
        <select
          onChange={this.handleChange}
          id="permission-input"
          className="cardInputs"
          value={this.state.permission}
          name="permission"
          >
            <option disabled value="Base">Permission Level</option>
            <option value="Admin">Admin</option>
            <option value="Worker">Worker</option>
            <option value="Viewer">Viewer</option>
        </select>
        <button
          onClick={this.addBoardUser}
          type="submit"
          className="cardInputs"
          >Give User Permission
          </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn,
  loggedEmail: state.user.loggedEmail
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addBoardUser: permissionObj => dispatch(addBoardUser(permissionObj))
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm));