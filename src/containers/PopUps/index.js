/*jshint esversion: 6*/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import {openBoardForm} from '../../actions';

class PopUps extends Component {

  renderButtons = () => {
    if (this.props.match.path === '/' && !this.props.showBoardForm) {
      return (
        <button
          onClick={() =>
            this.props.openBoardForm()
          }
        >
          New Board
        </button>)
    }

    return (<button>HELLO</button>)
  }

  render() {
    if (this.props.loggedIn) {
      return this.renderButtons();
    } else {
      return (<div></div>)
    }
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn,
  showBoardForm: state.pop.showBoardForm
})

const mapDispatchToProps = (dispatch) => ({
  openBoardForm: () => dispatch(openBoardForm())
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PopUps));