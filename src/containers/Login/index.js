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
      email: '',
      password: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password);
    this.setState({email: '', password: ''});
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
          <p id="loggedInMsg">{'Hello ' + this.props.loggedEmail}
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
              placeholder="Email"
              name="email"
              value={this.props.email}
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
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn,
  loggedEmail: state.user.loggedEmail
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: (email, password) => dispatch(login(email, password)),
  logout: () => dispatch(logout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);