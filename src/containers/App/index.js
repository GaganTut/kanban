import React, { Component } from 'react';

class App extends Component {







  render() {
    return (
      <div className="App">
        <Login />
        <h1 id="main-title">KANBAN BOARD</h1>
        <div id="full-board">
          <Column cardList={this.state.queueCards} updateApp={this.getCards} columnID="queue-column"></Column>
          <Column cardList={this.state.progressCards} updateApp={this.getCards} columnID="progress-column"></Column>
          <Column cardList={this.state.completedCards} updateApp={this.getCards} columnID="completed-column"></Column>
        </div>
        <CardForm getCards={this.getCards}/>
      </div>
    );
  }
}

export default App;
