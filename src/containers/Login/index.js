/*jshint esversion: 6*/
import React, {Component} from 'react';
import './Login.css';
import { login, logout } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

  handleText = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleLogOut = (event) => {
    this.props.logout();
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
        <div
          className="login-component"
          >
          <form
            onSubmit={this.handleSubmit}
            className="login-form"
            >
            <input type="text"
              placeholder="Username"
              name="username"
              value={this.props.username}
              onChange={this.handleText}
              />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={this.props.password}
              onChange={this.handleText}
              />
            <input
              type="submit"
              value="Sign In"
              />
            <Link to="/signup" className="sign-up-link"><input type="button" className="btn-to-signup" value="Sign Up"/></Link>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    loggedUsername: state.user.loggedUsername
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (username, password) => dispatch(login(username, password)),
    logout: () => dispatch(logout())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);