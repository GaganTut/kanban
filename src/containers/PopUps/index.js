/*jshint esversion: 6*/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import {openBoardForm, openCardForm, logout} from '../../actions';

class PopUps extends Component {

  renderButtons = () => {
    if (this.props.location.pathname === '/' && !this.props.showBoardForm) {
      return (
        <button
          onClick={this.props.openBoardForm}
        >
          New Board
        </button>
      )
    }

    if (this.props.location.pathname.indexOf('board') >= 0 && !this.props.showCardForm) {
      return (
        <button
          onClick={() =>
            this.props.openCardForm()
          }
        >
          New Card
        </button>
      )
    }

    return (<button onClick={this.props.closeForms}>Close Form</button>)
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div>
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
  loggedIn: state.user.loggedIn
})

const mapDispatchToProps = (dispatch) => ({
  openBoardForm: () => dispatch(openBoardForm()),
  openCardForm: () => dispatch(openCardForm()),
  logout: () => dispatch(logout())
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PopUps));