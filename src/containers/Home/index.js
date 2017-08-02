/*jshint esversion: 6*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import './Home.css';
import { closeError, openLoginForm } from '../../actions';
import ErrorMessage from '../../components/ErrorMessage';
import Homeboard from '../../components/Homeboard';
import BoardForm from '../BoardForm';

class Home extends Component {

  renderLoginMessage = () => (
    <div id="please-login">
      <button
        onClick={()=>this.props.openLoginForm}
        id="open-login-button"
        >
          Please Login
      </button>
      {/*this.props.showLoginForm && <LoginForm/>*/}
      {/*this.props.showSignupForm && <SignUpForm/>*/}
    </div>
  );

  renderBoards = () => {
    return (
      <div
        className="boards-page"
        >
          {this.props.allBoards.map(board =>
            <Homeboard
              key={board.id}
              board={board}
              openBoard={()=>this.props.history.push(`/board/${board.id}`)}
              />
          )}
      </div>
      )
  }

  renderNoBoards = () => (
    <div>
      <h1>To Start, Create a new board</h1>
    </div>
  );

  render() {
    return (
      <div className="App">
        {this.props.loggedIn ?
          (this.props.allBoards.length > 0 ?
            (this.renderBoards())
            :
            (this.renderNoBoards()))
          :
          (this.renderLoginMessage())
        }
        {this.props.fetching && <div id="loading-message"></div>}
        {this.props.hasError && <ErrorMessage
                  errorMessage={this.props.errorMessage}
                  closeError={this.props.closeError}
                  />}
        {this.props.showBoardForm && <BoardForm/>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allBoards: state.board.allBoards,
  fetching: state.pop.fetching,
  loggedIn: state.user.loggedIn,
  showBoardForm: state.pop.showBoardForm,
  showLoginForm: state.pop.showLoginForm
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  closeError: () => dispatch(closeError()),
  openLoginForm: () => dispatch(openLoginForm())
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));