import React, {Component} from 'react';
import './CardForm.css';
import {addCardToDb} from '../../lib/fetchFromDB';

class CardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      priority: '',
      status: '',
      assignedTo: ''
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleAssignedToChange = this.handleAssignedToChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    addCardToDb(this.createCardObject(this.object))
      .then(card => {
        this.setState({
          title: '',
          priority: '',
          status: '',
          assignedTo: ''
        });
        this.props.getCards();
      })
      .catch(console.log);
  }

  handleTitleChange(event) {
    this.setState({ title : event.target.value });
  }

  handlePriorityChange(event) {
    this.setState({ priority : event.target.value });
  }

  handleStatusChange(event) {
    this.setState({ status : event.target.value });
  }

  handleAssignedToChange(event) {
    this.setState({ assignedTo : event.target.value });
  }

  createCardObject(stateObj) {
    return {
      title: this.state.title,
      priority: this.state.priority,
      status: this.state.status,
      assignedTo: this.state.assignedTo,
      createdBy: localStorage.username
    };
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        id="newCardForm"
      >

        <input type="text"
          placeholder="title"
          onChange={this.handleTitleChange}
          value={this.state.title}
          id="title-input"
          className="cardInputs"
        />

        <select
          onChange={this.handlePriorityChange}
          id="priority-input"
          className="cardInputs"
          value={this.state.priority}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
        </select>

        <select
          onChange={this.handleStatusChange}
          id="status-input"
          className="cardInputs"
          value={this.state.status}
          >
            <option value="Queue">Queue</option>
            <option value="Progress">Progress</option>
            <option value="Completed">Completed</option>
        </select>

        <input
          type="text"
          placeholder="Assigned To"
          onChange={this.handleAssignedToChange}
          value={this.state.assignedTo}
          id="assigned-input"
          className="cardInputs"
          />
        <button
          type="submit"
          id="submit-input"
          className="cardInputs"
          >Submit Card
          </button>
      </form>
    )
  }
}

export default CardForm;