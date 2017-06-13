/*jshint esversion: 6*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import './Home.css';
import { loadCards, closeError } from '../../actions';
import Column from '../../components/Column';
import ErrorMessage from '../../components/ErrorMessage';

class Home extends Component {

  renderLoginMessage = () => (
    <div id="please-login">
      <h1>Please Login or Signup</h1>
      <input value="Sign Up Now" type="button" onClick={()=> this.props.history.push('/signup')}/>
    </div>
  );

  renderBoards = () => {
    return this.props.allBoards.map(board => <div>{board.title}</div>)
  }

  renderNoBoards = () => (
    <div>
      <h1>To Start, Create a new board</h1>
    </div>
  );

  render() {
    return (
      <div className="App">
        {this.props.loggedIn ? (this.props.allBoards.length > 0 ? (this.renderBoards()) : (this.renderNoBoards())) : (this.renderLoginMessage())}
        {this.props.fetching && <div id="loading-message"></div>}
        {this.props.hasError && <ErrorMessage
                  errorMessage={this.props.errorMessage}
                  closeError={this.props.closeError}
                  />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allBoards: state.board.allBoards,
    fetching: state.helper.fetching,
    hasError: state.helper.hasError,
    errorMessage: state.helper.errorMessage,
    loggedIn: state.user.loggedIn
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeError: () => dispatch(closeError())
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));