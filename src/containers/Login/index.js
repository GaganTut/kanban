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
      loggedIn: localStorage.loggedIn || false,
      loggedUsername: localStorage.username || '',
      loggedFirstname: localStorage.firstname || '',
      loggedLastname: localStorage.lastname || ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.attemptLogin(this.state.username, this.state.password);
    this.setState({username: '', password: ''});
  }

  attemptLogin = (username, password) => {
    sendLoginRequest(username, password)
      .then((user) => {
        this.setState({
          loggedIn: true,
          loggedUsername: user.username,
          loggedFirstname: user.firstname,
          loggedLastname: user.lastname
        });
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
    this.setState({
      loggedIn: false,
      loggedUsername: '',
      loggedFirstname: '',
      loggedLastname: ''
    });
    logoutUser();
    localStorage.clear();
  };


  render() {
    if (this.state.loggedIn) {
      return (
        <div
          className="login-component"
          >
            <p id="loggedInMsg">{'Hello ' + this.state.loggedUsername}
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
            value={this.state.username}
            onChange={this.handleUsername}
            />
          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
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