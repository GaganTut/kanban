/*jshint esversion: 6*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import './Home.css';
import { openLoginForm } from '../../actions';
import Homeboard from '../../components/Homeboard';

class Home extends Component {

  renderLoginMessage = () => {
    this.props.openLoginForm();
    return (<div></div>)
  };

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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allBoards: state.board.allBoards,
  loggedIn: state.user.loggedIn,
  showForm: state.pop.showForm
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  openLoginForm: () => dispatch(openLoginForm())
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));