/*jshint esversion: 6*/
import React, {Component} from 'react';
import './Login.css';
import { login, logout } from '../../actions';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password);
    this.setState({username: '', password: ''});
  };

  handleUsername = (event) => {
    this.setState({username: event.target.value});
  };

  handlePassword = (event) => {
    this.setState({password: event.target.value});
  };

  handleLogOut = (event) => {
    this.props.logout(localStorage.username);
  };


  render() {
    if (this.props.loggedIn) {
      return (
        <div
          className="login-component"
          >
            <p id="loggedInMsg">{'Hello ' + this.props.loggedUsername}
            </p>

            <input
              type="button"
              onClick={this.handleLogOut}
              value="Sign Out"
              />
        </div>
      )
    } else {
      return (
        <form
          onSubmit={this.handleSubmit}
          className="login-component">
          <input type="text"
            placeholder="Username"
            value={this.props.username}
            onChange={this.handleUsername}
            />
          <input
            type="password"
            placeholder="Password"
            value={this.props.password}
            onChange={this.handlePassword}
            />
          <input
            type="submit"
            value="Sign In"
            />
          <button>
            Sign Up
          </button>
        </form>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    loggedUsername: state.loggedUsername,
    loggedFirstname: state.loggedFirstname,
    loggedLastname: state.loggedLastname
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (username, password) => dispatch(login(username, password)),
    logout: username => dispatch(logout(username))
  }
}

const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default ConnectedLogin;