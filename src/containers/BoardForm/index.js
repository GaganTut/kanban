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
          <input
            onClick={this.handleSubmit}
            type="submit"
            id="submit-input"
            className="cardInputs"
            value="Create Board"
            />
        </div>
      )
    } else {
      return (
        <div className="footerForm">
          <h1>PLEASE SIGN IN TO SEE YOUR BOARDS</h1>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createBoard: title => dispatch(createBoard(title)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardForm);