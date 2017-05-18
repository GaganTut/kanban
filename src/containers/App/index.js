/*jshint esversion: 6*/
import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { loadCards } from '../../actions';
import Column from '../../components/Column';
import CardForm from '../CardForm';
import Login from '../Login';
import Signup from '../Signup';
import ErrorMessage from '../../components/error';

class App extends Component {
  constructor(props) {
    super(props);

    this.title = 'KANBAN BOARD';
  }
  componentWillMount() {
    this.getCards();
  }

  getCards = () => {
    this.props.loadCards();
  }

  render() {
    return (
      <div className="App">
        <h1 id="main-title">{this.title}</h1>
        <Login />
        <Signup />
        <ErrorMessage />
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
        <CardForm/>
        {this.props.fetching && <div id="loading-message"></div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allCards: state.board.allCards,
    fetching: state.board.fetching
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCards: cards => dispatch(loadCards(cards))
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ConnectedApp;