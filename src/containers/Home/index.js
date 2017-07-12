/*jshint esversion: 6*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import './Home.css';
import { closeError } from '../../actions';
import ErrorMessage from '../../components/ErrorMessage';
import Homeboard from '../../components/Homeboard';
import BoardForm from '../BoardForm';

class Home extends Component {

  renderLoginMessage = () => (
    <div id="please-login">
      <h1>Please Login or Signup</h1>
      <input value="Sign Up Now" type="button" onClick={()=> this.props.history.push('/signup')}/>
    </div>
  );

  renderBoards = () => {
    return (<div className="boards-page">{this.props.allBoards.map(board => <Homeboard key={board.id} board={board} openBoard={()=>this.props.history.push(`/board/${board.id}`)}/>)}</div>
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
  showBoardForm: state.pop.showBoardForm
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  closeError: () => dispatch(closeError())
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));