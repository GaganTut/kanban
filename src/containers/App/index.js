import React, {Component} from 'react';
import Home from '../../containers/Home';
import Board from '../../containers/Board';
import Signup from '../../containers/Signup';
import CardForm from '../../containers/CardForm';
import Login from '../../containers/Login';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadApp} from '../../actions';

class App extends Component {

  componentWillMount() {
    this.props.loadApp();
  }


  render() {
    return (
      <Router>
        <div className="whole-app">
          <div className="main-title">
            <h1>Kanban</h1>
            <h3>Keepin' it simple</h3>
            <Login />
          </div>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/board/:id" component={Board} />
          <CardForm/>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadApp: () => dispatch(loadApp())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);