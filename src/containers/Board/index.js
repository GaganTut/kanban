/*jshint esversion: 6*/
import React, { Component } from 'react';
import './Board.css';
import { connect } from 'react-redux';
import { loadCards, closeError } from '../../actions';
import Column from '../../components/Column';
import ErrorMessage from '../../components/ErrorMessage';
import CardForm from '../CardForm';

class Board extends Component {
  componentWillMount() {
    this.getCards();
  }

  getCards = () => {
    this.props.loadCards(this.props.match.params.id);
  }

  render() {
   const boardCards = this.props.allCards.filter(card => Number(card.attachedTo) === Number(this.props.match.params.id));
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
        {this.props.fetching && <div id="loading-message"></div>}
        {this.props.hasError && <ErrorMessage
                  errorMessage={this.props.errorMessage}
                  closeError={this.props.closeError}
                  />
        }
        {this.props.showCardForm && <CardForm/>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allCards: state.board.allCards,
  fetching: state.board.fetching,
  hasError: state.board.hasError,
  errorMessage: state.board.errorMessage,
  showCardForm: state.pop.showCardForm
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadCards: boardId => dispatch(loadCards(boardId)),
  closeError: () => dispatch(closeError())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);