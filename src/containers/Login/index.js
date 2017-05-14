/*jshint esversion: 6*/
import React, {Component} from 'react';
import './Login.css';
import {sendLoginRequest, logoutUser} from '../../lib/fetchFromDB';

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
    this.attemptLogin(this.state.username, this.state.password);
    this.setState({username: '', password: ''});
  }

  attemptLogin = (username, password) => {
    sendLoginRequest(username, password)
      .then(user => {
        this.props.login(user);
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('username', user.username);
        localStorage.setItem('firstname', user.firstname);
        localStorage.setItem('lastname', user.lastname);
      })
      .catch(console.log);
  };

  handleUsername = (event) => {
    this.setState({username: event.target.value});
  };

  handlePassword = (event) => {
    this.setState({password: event.target.value});
  };

  handleLogOut = (event) => {
    logoutUser();
    localStorage.clear();
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

export default Login;