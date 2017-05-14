/*jshint esversion: 6*/
import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { loadCards } from '../../actions';
import {getAllCards} from '../../lib/fetchFromDB';
import Column from '../../components/Column';
import CardForm from '../CardForm';
import Login from '../Login';

class App extends Component {
  constructor(props) {
    super(props);

    this.title = 'KANBAN BOARD';

  }
  componentWillMount() {
    this.getCards();
  }

  getCards = () => {
    return getAllCards()
      .then(this.props.loadCards)
      .catch(console.log);
  }

  render() {
    return (
      <div className="App">
        <Login />
        <h1 id="main-title">{this.title}</h1>
        <div id="full-board">
          <Column cardList={this.props.allCards.filter(card => card.status === 'Queue')} columnID="queue-column"></Column>
          <Column cardList={this.props.allCards.filter(card => card.status === 'Progress')} columnID="progress-column"></Column>
          <Column cardList={this.props.allCards.filter(card => card.status === 'Completed')} columnID="completed-column"></Column>
        </div>
        <CardForm/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allCards: state.allCards
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