/*jshint esversion: 6*/
import React, {Component} from 'react';
import './Signup.css';
import { signup } from '../../actions';
import { connect } from 'react-redux';

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
    return (
      <div
        className="signup-component"
        >
        <form
          onSubmit={this.handleSubmit}
          className="signup-form"
          >
          <h3>Register Here</h3>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleText}
            placeholder="Enter Valid Email"
            />
          <input
            type="text"
            name="fullname"
            value={this.state.fullname}
            onChange={this.handleText}
            placeholder="Enter Full Name"
            />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleText}
            placeholder="Must be 8+ Characters"
            />
          <input
            type="password"
            name="valPassword"
            value={this.state.valPassword}
            onChange={this.handleText}
            placeholder="Passwords Must Match"
            />
          <input
            type="submit"
            value="Register"
            />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  signup: userInfo => dispatch(signup(userInfo))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);