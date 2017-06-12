/*jshint esversion: 6*/
import React, { Component } from 'react';
import './Board.css';
import { connect } from 'react-redux';
import { loadCards, closeError } from '../../actions';
import Column from '../../components/Column';
import ErrorMessage from '../../components/ErrorMessage';

class Board extends Component {
  componentWillMount() {
    this.getCards();
  }

  getCards = () => {
    this.props.loadCards();
  }

  render() {
    return (
      <div className="App">
        <div id="full-board">
          <Column
            cardList={this.props.allCards.filter(card => card.status === 'Queue')}
            columnName="Queue"
            />
          <Column
            cardList={this.props.allCards.filter(card => card.status === 'Progress')}
            columnName="Progress"
            />
          <Column
            cardList={this.props.allCards.filter(card => card.status === 'Completed')}
            columnName="Completed"
            />
        </div>
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
    allCards: state.board.allCards,
    fetching: state.board.fetching,
    hasError: state.board.hasError,
    errorMessage: state.board.errorMessage
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCards: cards => dispatch(loadCards(cards)),
    closeError: () => dispatch(closeError())
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);

export default ConnectedApp;