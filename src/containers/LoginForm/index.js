/*jshint esversion: 6*/
import React, {Component} from 'react';
import './Login.css';
import { login, logout, openSignupForm } from '../../actions';
import { connect } from 'react-redux';

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
    return (
      <div
        className="login-component"
        >
          <div className="login-intro">
            <img src={require('../../assets/kanbanLogo.png')} alt="Kanban Logo"/>
            <h5>Control Your Tasks</h5>
            <p>Organize what you need to get done through a simplistic approach to a task board. </p>
          </div>
          <div className="login-input">
            <input
              type="text"
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
            <button
              type="submit"
              onClick={this.handleSubmit}
              > Sign in
              </button>
          </div>
          <div className="login-register">
            <h3>Don't have an account?</h3>
            <button
              onClick={this.props.openSignupForm}
              >
                Register Now
            </button>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn,
  loggedEmail: state.user.loggedEmail
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: (email, password) => dispatch(login(email, password)),
  logout: () => dispatch(logout()),
  openSignupForm: () => dispatch(openSignupForm())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);