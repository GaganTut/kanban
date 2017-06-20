/*jshint esversion: 6*/
import React, {Component} from 'react';
import './CardForm.css';
import { addCard, addBoardUser } from '../../actions';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';

class CardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      priority: 'Base',
      status: 'Base',
      assignedTo: '',
      username: '',
      permission: 'Base'
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addCard(this.createCardObject(this.state));
    this.reset();
  };

  addBoardUser = (event) => {
    event.preventDefault();
    this.props.addBoardUser(this.createUserObject(this.state));
    this.reset();
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  createCardObject(stateObj) {
    return {
      title: stateObj.title,
      priority: stateObj.priority,
      status: stateObj.status,
      assignedTo: stateObj.assignedTo,
      attachedTo: this.props.match.params.id
    };
  }
  createUserObject(stateObj) {
    return {
      UserUsername: stateObj.username,
      permission: stateObj.permission,
      BoardId: this.props.match.params.id
    };
  }

  reset() {
    this.setState({
      title: '',
      priority: 'Base',
      status: 'Base',
      assignedTo: '',
      username: '',
      permission: 'Base'
    });
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div
          className="footerForm"
        >

          <input type="text"
            placeholder="title"
            onChange={this.handleChange}
            value={this.state.title}
            id="title-input"
            className="cardInputs"
            name="title"
          />

          <select
            onChange={this.handleChange}
            id="priority-input"
            className="cardInputs"
            value={this.state.priority}
            name="priority"
            >
              <option disabled value="Base">Choose Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
          </select>

          <select
            onChange={this.handleChange}
            id="status-input"
            className="cardInputs"
            value={this.state.status}
            name="status"
            >
              <option disabled value="Base">Choose Status</option>
              <option value="Queue">Queue</option>
              <option value="Progress">Progress</option>
              <option value="Completed">Completed</option>
          </select>

          <input
            type="text"
            placeholder="Assigned To"
            onChange={this.handleChange}
            value={this.state.assignedTo}
            id="assigned-input"
            className="cardInputs"
            name="assignedTo"
            />
          <input
            onClick={this.handleSubmit}
            type="submit"
            id="submit-input"
            className="cardInputs"
            value="Submit Card"
            />
          <input
            type="text"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.username}
            id="username-input"
            className="cardInputs"
            name="username"
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
          <input
            onClick={this.addBoardUser}
            type="submit"
            id="submit-input"
            className="cardInputs"
            value="Add User"
            />
        </div>
      )
    } else {
      return (
        <div className="footerForm">
          <h1>PLEASE SIGN IN TO POST OR EDIT CARD</h1>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    loggedUsername: state.user.loggedUsername,
    userListOptions: state.user.userListOptions
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addCard: card => dispatch(addCard(card)),
    addBoardUser: (username, permission) => dispatch(addBoardUser(username, permission))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CardForm));