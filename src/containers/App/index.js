import React, {Component} from 'react';
import Home from '../Home';
import Board from '../Board';
import Signup from '../Signup';
import TopHeader from '../../components/TopHeader';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import {Switch} from 'react-router';
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
          <TopHeader />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/board/:id" component={Board} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn
})

const mapDispatchToProps = dispatch => ({
  loadApp: () => dispatch(loadApp())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);