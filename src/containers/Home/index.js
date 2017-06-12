/*jshint esversion: 6*/
import React, { Component } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import { loadCards, closeError } from '../../actions';
import Column from '../../components/Column';
import ErrorMessage from '../../components/ErrorMessage';

class Home extends Component {
  componentWillMount() {
    this.getBoards();
  };

  getBoards = () => {
    this.props.loadBoards();
  };

  renderLoginMessage = () => (
    <div>
      <h1>Please Login or Signup</h1>
    </div>
  );

  renderBoards = () => (
    {allBoards.map(board => <div>{board.title}</div>)}
  );

  renderNoBoards = () => (
    <div>
      <h1>To Start, Create a new board</h1>
    </div>
  );

  render() {
    return (
      <div className="App">
        {loggedIn ? (this.props.allBoards.length > 0 ? (renderBoards()) : (renderNoBoards()) : renderLoginMessage())}
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
    fetching: state.board.fetching,
    hasError: state.board.hasError,
    errorMessage: state.board.errorMessage,
    loggedIn: state.user.loggedIn
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadBoards: () => dispatch(loadCards()),
    closeError: () => dispatch(closeError())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);