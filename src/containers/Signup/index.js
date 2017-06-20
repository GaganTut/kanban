/*jshint esversion: 6*/
import React, {Component} from 'react';
import './Signup.css';
import { signup } from '../../actions';
import { connect } from 'react-redux';
import {Redirect, Link} from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      fullname: '',
      password: '',
      valPassword: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.signup(this.state);
    this.setState({
      email: '',
      fullname: '',
      password: '',
      valPassword: ''
    });
  };

  handleText = (event) => {
    this.setState({[event.target.name]: event.target.value});
    if(event.target.name === 'valPassword' && event.target.value !== this.state.password) {
      event.target.style = {'border': '1px solid red'};
    } else if (event.target.name === 'valPassword' && event.target.value === this.state.password) {
      event.target.style = {'border': '1px solid green'};
    }
  };

  render() {
    if (!this.props.loggedIn) {
      return (
        <div
          className="signup-component"
          >
          <h1 className="form-title">Just Simply Sign Up</h1>
          <div>
            <label htmlFor="email">Enter Email:</label>
            <input type="text" name="email" value={this.state.email} onChange={this.handleText} placeholder="Enter Valid Email"/>
          </div>
          <div>
            <label htmlFor="fullname">Enter First Name:</label>
            <input type="text" name="fullname" value={this.state.fullname} onChange={this.handleText} placeholder="Enter First Name"/>
          </div>
          <div>
            <label htmlFor="password">Create Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleText} placeholder="Must be 8+ Characters"/>
          </div>
          <div>
            <label htmlFor="valPassword">Verify Password:</label>
            <input type="password" name="valPassword" value={this.state.valPassword} onChange={this.handleText} placeholder="Passwords Must Match"/>
          </div>
          <input className="submit-button" type="button" value="Sign-Up" onClick={this.handleSubmit}/>
          <Link to="/" className="back-to-home"><input type="button" className="btn-to-home" value="Back To Home"/></Link>
        </div>
      );
    } else {
      return (
        <Redirect to='/'/>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  signup: userInfo => dispatch(signup(userInfo))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);