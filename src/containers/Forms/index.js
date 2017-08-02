import React, {Component} from 'react';
import {connect} from 'react-redux';
import {closeForms} from '../../actions';
import CardForm from '../CardForm';
import BoardForm from '../BoardForm';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import './Forms.css';

class Forms extends Component {

  render() {
    return (
      <div
      className="popup-form-div"
      >
        <button onClick={this.props.closeForms}>X</button>
        {this.props.showCardForm && <CardForm/>}
        {this.props.showBoardForm && <BoardForm/>}
        {this.props.showLoginForm && <LoginForm/>}
        {this.props.showSignupForm && <SignupForm/>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showCardForm: state.pop.showCardForm,
  showBoardForm: state.pop.showBoardForm,
  showLoginForm: state.pop.showLoginForm,
  showSignupForm: state.pop.showSignupForm
})

const mapDispatchToProps = dispatch => ({
  closeForms: () => dispatch(closeForms())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forms);