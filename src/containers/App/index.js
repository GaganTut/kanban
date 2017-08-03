import React, {Component} from 'react';
import Home from '../Home';
import Board from '../Board';
import Forms from '../Forms';
import ErrorMessage from '../../components/ErrorMessage';
import TopHeader from '../../components/TopHeader';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import {Switch} from 'react-router';
import {connect} from 'react-redux';
import {loadApp, closeError} from '../../actions';

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
          {this.props.showForm && <Forms/>}
          {this.props.fetching && <div id="loading-message"></div>}
          {this.props.hasError && <ErrorMessage
                    errorMessage={this.props.errorMessage}
                    closeError={this.props.closeError}
                    />
          }
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  fetching: state.board.fetching,
  hasError: state.board.hasError,
  errorMessage: state.board.errorMessage,
  showForm: state.pop.showForm
})

const mapDispatchToProps = dispatch => ({
  loadApp: () => dispatch(loadApp()),
  closeError: () => dispatch(closeError())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);