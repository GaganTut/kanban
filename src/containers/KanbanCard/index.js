/*jshint esversion: 6*/
import React, {Component} from 'react';
import './KanbanCard.css';
import { connect } from 'react-redux';
import { updateCard, deleteCard } from '../../actions';

class KanbanCard extends Component{
  constructor(props) {
    super(props);

    this.state = {
      editCard: false,
      title: this.props.card.title,
      assignedTo: this.props.card.assignedTo,
      priority: this.props.card.priority
    };
  }

  handleDelete = (event) => {
    event.preventDefault();
    this.props.deleteCard(this.props.card.id)
  };

  handleEdit = () => {
    this.setState({editCard: !this.state.editCard});
  };

  handleCompleteEdit = (event) => {
    event.preventDefault();
    this.setState({editCard: false});
    this.props.updateCard({
      id: this.props.card.id,
      title: this.state.title,
      assignedTo: this.state.assignedTo,
      priority: this.state.priority
    });
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleDrag = (event) => {
    event.preventDefault();
    if (event.clientX / window.innerWidth < 0.3) {
      this.props.updateCard({id: this.props.card.id, status: 'Queue'});
    } else if (event.clientX / window.innerWidth < 0.625) {
      this.props.updateCard({id: this.props.card.id, status: 'Progress'});
    } else if (event.clientX / window.innerWidth < 1) {
      this.props.updateCard({id: this.props.card.id, status: 'Completed'});
    } else {
      return;
    }

  };

  getPriorityColor(priority) {
    switch (priority) {
      case 'Urgent' :
        return {'backgroundColor':'red'};
      case 'High' :
        return {'backgroundColor':'orange'};
      case 'Medium' :
        return {'backgroundColor':'yellow'};
      case 'Low' :
        return {'backgroundColor':'beige'};
      default:
        return {'backgroundColor':'beige'};
    }
  }

  render() {
    if(this.state.editCard) {
      return (
        <form
          className="editCardForm"
          draggable="true"
          onSubmit={this.handleCompleteEdit}
          style={this.getPriorityColor(this.props.card.priority)}
          onDoubleClick={this.handleEdit}
          onDragEnd={this.handleDrag}
          >
          <h1>#{this.props.card.id}</h1>
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
          <p>By: {this.props.card.createdBy}</p>
          <input type="text" name="assignedTo" value={this.state.assignedTo} onChange={this.handleChange}/>
          <select type="text" name="priority" value={this.state.priority} onChange={this.handleChange}>
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
          draggable="true"
          style={this.getPriorityColor(this.props.card.priority)}
          onDoubleClick={this.handleEdit}
          onDragEnd={this.handleDrag}
          >
            <h1>#{this.props.card.id}</h1>
            <h4>{this.props.card.title}</h4>
            <p>By: {this.props.card.createdBy}</p>
            <p>For: {this.props.card.assignedTo}</p>
            <input type="button" onClick={this.handleDelete} value="Delete Card"/>
        </div>
      )
    }
  }
};

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateCard: card => dispatch(updateCard(card)),
    deleteCard: card => dispatch(deleteCard(card))
  }
}

const ConnectedKanbanCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(KanbanCard);

export default ConnectedKanbanCard;