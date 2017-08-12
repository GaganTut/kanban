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
      showDescription: false,
      title: this.props.card.title,
      assignedTo: this.props.card.assignedTo || '',
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
    if (event.clientX / window.innerWidth < 0.28) {
      this.props.updateCard({id: this.props.card.id, status: 'Queue'});
    } else if (event.clientX / window.innerWidth < 0.61) {
      this.props.updateCard({id: this.props.card.id, status: 'Progress'});
    } else if (event.clientX / window.innerWidth < 1) {
      this.props.updateCard({id: this.props.card.id, status: 'Completed'});
    } else {
      return;
    }
  };

  handleDescription = (event) => {
    event.preventDefault();
    this.setState({showDescription: !this.state.showDescription});
  };

  getPriorityColor(priority) {
    switch (priority) {
      case 'Urgent' :
        return {
          'border':'2px solid #ff9999',
          'backgroundColor':'#ffe6e6'
        };
      case 'High' :
        return {
          'border':'2px solid #ffcc99',
          'backgroundColor':'#fff2e6'
        };
      case 'Medium' :
        return {
          'border':'2px solid #ffff99',
          'backgroundColor':'#ffffe6'
        };
      case 'Low' :
        return {
          'border':'2px solid #ccff99',
          'backgroundColor':'#f2ffe6'
        };
      default:
        return {
          'border':'2px solid #ccff99',
          'backgroundColor':'#f2ffe6'
        };
    }
  }

  render() {
    if(this.state.editCard) {
      return (
        <form
          className="editCardForm"
          onSubmit={this.handleCompleteEdit}
          style={this.getPriorityColor(this.props.card.priority)}
          >
          <input
            className="close-edit"
            type="button"
            onClick={this.handleEdit}
            value="✖"
            />
          <h1>
            Edit
          </h1>
          <input
            className="edit-title"
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            />
          <select
            className="edit-priority"
            type="text"
            name="priority"
            value={this.state.priority}
            onChange={this.handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
          <input
            type="submit"
            value="Save Edit"
            />
          <input
            type="button"
            onClick={this.handleDelete}
            value="Delete Card"
            />
        </form>
      )
    } else if (this.state.showDescription) {
      return (
        <div className="card-description">
          <input
            className="close-edit"
            type="button"
            onClick={this.handleDescription}
            value="✖"
            />
          <h1>{this.props.card.title}</h1>
          <p>{this.props.card.description}</p>
        </div>
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
            <h4 className="card-title">{this.props.card.title}</h4>
            <button
              onClick={this.handleDescription}
            > Open<br/>
              Description
            </button>
            <p className="card-creator">By: {this.props.card.createdBy}</p>
        </div>
      )
    }
  }
};

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateCard: card => dispatch(updateCard(card)),
  deleteCard: card => dispatch(deleteCard(card))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KanbanCard);