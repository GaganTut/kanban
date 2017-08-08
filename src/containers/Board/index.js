/*jshint esversion: 6*/
import React, { Component } from 'react';
import './Board.css';
import { connect } from 'react-redux';
import {Redirect} from 'react-router';
import { loadCards, closeError } from '../../actions';
import Column from '../../components/Column';

class Board extends Component {
  componentWillMount() {
    this.getCards();
  }

  getCards = () => {
    this.props.loadCards(this.props.match.params.id);
  }

  render() {
   const boardCards = this.props.allCards.filter(card => Number(card.attachedTo) === Number(this.props.match.params.id));
   console.log(boardCards);
   if (!this.props.loggedIn){return (<Redirect to="/"/>)}
    return (
      <div className="App">
        <div id="full-board">
          <Column
            cardList={boardCards.filter(card => card.status === 'Queue')}
            columnName="Queue"
            />
          <Column
            cardList={boardCards.filter(card => card.status === 'Progress')}
            columnName="Progress"
            />
          <Column
            cardList={boardCards.filter(card => card.status === 'Completed')}
            columnName="Completed"
            />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allCards: state.board.allCards,
  loggedIn: state.user.loggedIn
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadCards: boardId => dispatch(loadCards(boardId)),
  closeError: () => dispatch(closeError())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);