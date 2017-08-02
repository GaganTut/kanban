/*jshint esversion: 6*/
import React, {Component} from 'react';
import './CardForm.css';
import { addCard } from '../../actions';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';

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
      title: stateObj.title,
      priority: stateObj.priority,
      status: stateObj.status,
      assignedTo: stateObj.assignedTo,
      attachedTo: this.props.match.params.id
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
    return (
      <div
        className="card-form"
      >
        <h2
          className="cardInputs popupTitles"
          >
          Add New Card to Board
        </h2>
        <input type="text"
          placeholder="title"
          onChange={this.handleChange}
          value={this.state.title}
          id="title-input"
          className="cardInputs"
          name="title"
        />
        <input
          type="text"
          placeholder="Assigned To"
          onChange={this.handleChange}
          value={this.state.assignedTo}
          id="assigned-input"
          className="cardInputs"
          name="assignedTo"
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
          onClick={this.handleSubmit}
          type="submit"
          id="submit-input"
          className="cardInputs"
          value="Submit Card"
          />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn,
  loggedEmail: state.user.loggedEmail
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addCard: card => dispatch(addCard(card))
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CardForm));