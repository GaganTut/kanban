/*jshint esversion: 6*/
import React, { Component } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import { loadCards } from '../../actions';
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
    this.props.loadCards();
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
        {this.props.fetching && <div id="loading-message"></div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allCards: state.allCards,
    fetching: state.fetching
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