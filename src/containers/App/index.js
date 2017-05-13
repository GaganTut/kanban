import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCards } from '../../actions';
import {getAllCards} from '../../lib/fetchFromDB';
import Column from '../../components/Column';
import CardForm from '../CardForm';
import Login from '../Login';

class App extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    this.getCards();
  }

  getCards = () => {
    return getAllCards()
      .then( cards => {
        this.props.loadCards();
      })
      .catch(console.log);
  }

  render() {
    return (
      <div className="App">
        <Login />
        <h1 id="main-title">KANBAN BOARD</h1>
        <div id="full-board">
          <Column cardList={this.props.queueCards} columnID="queue-column"></Column>
          <Column cardList={this.props.progressCards} columnID="progress-column"></Column>
          <Column cardList={this.props.completedCards} columnID="completed-column"></Column>
        </div>
        <CardForm/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    queueCards: state.queueCards,
    progressCards: state.progressCards,
    completedCards: state.completedCards
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCards: cards => {
      dispatch(loadCards(cards))
    }
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ConnectedApp;