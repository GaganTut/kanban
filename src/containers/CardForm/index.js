/*jshint esversion: 6*/
import React, {Component} from 'react';
import './CardForm.css';
import { addCard, loadUserList } from '../../actions';
import { connect } from 'react-redux';

class CardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      priority: 'Base',
      status: 'Base',
      assignedTo: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addCard(this.createCardObject(this.state));
    this.reset();
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  createCardObject(stateObj) {
    return {
      title: this.state.title,
      priority: this.state.priority,
      status: this.state.status,
      assignedTo: this.state.assignedTo,
      createdBy: this.props.loggedUsername
    };
  }

  reset() {
    this.setState({
      title: '',
      priority: 'Base',
      status: 'Base',
      assignedTo: ''
    });
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div
          id="newCardForm"
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
        </div>
      )
    } else {
      return (
        <div id="not-logged-form">
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
    loadUserList: () => dispatch(loadUserList())
  }
}

const ConnectedCardForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CardForm);

export default ConnectedCardForm;