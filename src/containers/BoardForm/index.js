/*jshint esversion: 6*/
import React, {Component} from 'react';
import './BoardForm.css';
import { createBoard } from '../../actions';
import { connect } from 'react-redux';

class BoardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createBoard(this.state.title);
    this.setState({
      title: ''
    });
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    return (
        <div
          className="board-form"
        >
          <h3>Give Board a Title</h3>
          <input type="text"
            placeholder="Enter Board Title"
            onChange={this.handleChange}
            value={this.state.title}
            id="title-input"
            className="cardInputs"
            name="title"
          />
          <button
            onClick={this.handleSubmit}
            type="submit"
            id="submit-input"
            className="cardInputs"
            >
            Create Board
            </button>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  createBoard: title => dispatch(createBoard(title)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardForm);