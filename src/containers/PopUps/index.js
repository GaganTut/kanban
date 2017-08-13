/*jshint esversion: 6*/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import {openBoardForm, openCardForm, openPermissionForm, logout} from '../../actions';
import './PopUps.css';

class PopUps extends Component {

  renderButtons = () => {
    if (this.props.location.pathname === '/' && !this.props.showBoardForm) {
      if (this.props.showForm) {return (<div></div>)};
      return (
        <button
          onClick={this.props.openBoardForm}
        >
          New Board
        </button>
      )
    }

    if (this.props.location.pathname.indexOf('board') >= 0 && !this.props.showCardForm) {
      if (this.props.showForm) {return (<div></div>)};
      return (
        <div className="board-buttons">
          <button
            onClick={() =>
              this.props.openCardForm()
            }
          >
            New Card
          </button>
          <button
            onClick={() =>
              this.props.openPermissionForm()
            }
          >
            Add User
          </button>
        </div>
      )
    }

    return (<button onClick={this.props.closeForms}>Close Form</button>)
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div
          className="pop-up-buttons">
          {this.renderButtons()}
          <button
            onClick={this.props.logout}
            >
            Log Out
          </button>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn,
  showForm: state.pop.showForm
})

const mapDispatchToProps = (dispatch) => ({
  openBoardForm: () => dispatch(openBoardForm()),
  openCardForm: () => dispatch(openCardForm()),
  openPermissionForm: () => dispatch(openPermissionForm()),
  logout: () => dispatch(logout())
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PopUps));