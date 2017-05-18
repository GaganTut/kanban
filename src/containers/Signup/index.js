/*jshint esversion: 6*/
import React, {Component} from 'react';
import './Signup.css';
import { signup } from '../../actions';
import { connect } from 'react-redux';

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
        <form
          onSubmit={this.handleSignUp}
          className="signup-component"
          >
          <input type="text" name="s_username" value={this.state.username} onChange={this.handleText}/>
          <input type="text" name="s_firstname" value={this.state.firstname} onChange={this.handleText}/>
          <input type="text" name="s_lastname" value={this.state.lastname} onChange={this.handleText}/>
          <input type="password" name="s_password" value={this.state.password} onChange={this.handleText}/>
          <input type="password" name="s_valPassword" value={this.state.valPassword} onChange={this.handleText}/>
          <input type="submit" value="Sign-Up"/>
          <input type="button" onClick={this.handleSignUpPage} value="Back To Login"/>
        </form>
      );
    } else {
      return (
        <div></div>
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