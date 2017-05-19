/*jshint esversion: 6*/
import React, {Component} from 'react';
import './Signup.css';
import { signup } from '../../actions';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      firstname: '',
      lastname: '',
      password: '',
      valPassword: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.signup(this.state);
    this.setState({
      username: '',
      firstname: '',
      lastname: '',
      password: '',
      valPassword: ''
    });
  };

  handleText = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSignUp = (event => {
    event.preventDefault();
    console.log(event.target);
  });

  render() {
    if (!this.props.loggedIn) {
      return (
        <div
          className="signup-component"
          >
          <h1 className="form-title">Please Enter To Sign Up</h1>
          <input type="text" name="username" value={this.state.username} onChange={this.handleText} placeholder="Enter Username"/>
          <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleText} placeholder="Enter First Name"/>
          <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleText} placeholder="Enter Last Name"/>
          <input type="password" name="password" value={this.state.password} onChange={this.handleText} placeholder="Enter Password"/>
          <input type="password" name="valPassword" value={this.state.valPassword} onChange={this.handleText} placeholder="Validate Password"/>
          <input type="button" value="Sign-Up" onClick={this.handleSubmit}/>
          <input type="button" onClick={this.handleSignUpPage} value="Back To Login"/>
        </div>
      );
    } else {
      return (
        <Redirect to='/'/>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signup: userInfo => dispatch(signup(userInfo))
  }
}

const ConnectedSignup = connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);

export default ConnectedSignup;