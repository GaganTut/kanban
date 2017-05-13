import React, {Component} from 'react';
import {updateCardInDb, deleteCardInDb} from '../../lib/fetchFromDB';

class KanbanCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      editCard: false,
      title: this.props.card.title,
      assignedTo: this.props.card.Assigned.id,
      priority: this.props.card.priority
    };

    this.handleStatus = this.handleStatus.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCompleteEdit = this.handleCompleteEdit.bind(this);
    this.handleTitleEdit = this.handleTitleEdit.bind(this);
    this.handleAssignEdit = this.handleAssignEdit.bind(this);
    this.handlePriorityEdit = this.handlePriorityEdit.bind(this);
  }

  handleStatus(event){
    event.preventDefault();
    this.updateCard(this.props.card.id, {status: event.target.value});
  }

  updateCard(id, cardObj) {
    updateCardInDb(id, cardObj)
      .then(this.props.updateApp)
      .catch(console.log);
  }

  handleDelete(event){
    event.preventDefault();
    this.deleteCard(this.props.card.id);
  }

  deleteCard(id) {
    deleteCardInDb(id)
      .then(this.props.updateApp)
      .catch(console.log);
  }

  handleEdit(event) {
    this.setState({editCard: !this.state.editCard});
  }

  handleCompleteEdit(event) {
    event.preventDefault();
    this.updateCard(this.props.card.id, {title: this.state.title, assignedTo: this.state.assignedTo, priority: this.state.priority});
    this.setState({editCard: false});
  }

  handleTitleEdit(event) {
    this.setState({title: event.target.value});
  }

  handleAssignEdit(event) {
    this.setState({assignedTo: event.target.value});
  }

  handlePriorityEdit(event) {
    this.setState({priority: event.target.value});
  }

  getPriorityColor(priority) {
    switch (priority) {
      case 'Urgent' :
        return {'background-color':'red'};
      case 'High' :
        return {'background-color':'orange'};
      case 'Medium' :
        return {'background-color':'yellow'};
      case 'Low' :
        return {'background-color':'beige'};
    }
  }

  render() {
    if(this.state.editCard) {
      return (
        <form
          className="editCardForm"
          onSubmit={this.handleCompleteEdit}
          style={this.getPriorityColor(this.props.card.priority)}
          onDoubleClick={this.handleEdit}
          >
          <h1>#{this.props.card.id}</h1>
          <input type="text" name="title" value={this.state.title} onChange={this.handleTitleEdit}/>
          <p>By: {this.props.card.Creator.username}</p>
          <input type="text" name="assignedTo" value={this.state.assignedTo} onChange={this.handleAssignEdit}/>
          <select type="text" name="priority" value={this.state.priority} onChange={this.handlePriorityEdit}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
          <input type="submit"/>
        </form>
      )
    } else {
      return (
        <div
          className="each-card"
          style={this.getPriorityColor(this.props.card.priority)}
          onDoubleClick={this.handleEdit}
          >
            <h1>#{this.props.card.id}</h1>
            <h4>{this.props.card.title}</h4>
            <p>By: {this.props.card.Creator.username}</p>
            <p>For: {this.props.card.Assigned.username}</p>
            <select value={this.props.card.status} onChange={this.handleStatus}>
              <option value="Queue">Queue</option>
              <option value="Progress">Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <input type="button" onClick={this.handleDelete} value="Delete Card"/>
        </div>
      )
    }
  }
};

export default KanbanCard;