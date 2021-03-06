import React, {Component} from 'react';
import {connect} from 'react-redux';
import {closeForms} from '../../actions';
import CardForm from '../CardForm';
import BoardForm from '../BoardForm';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import PermissionForm from '../PermissionForm';
import './Forms.css';

class Forms extends Component {

  render() {
    return (
      <div
      className="popup-form-div"
      >
        <button
        onClick={this.props.closeForms}
        className="form-close-button"
        >
          X
      </button>
        {this.props.showCardForm && <CardForm/>}
        {this.props.showBoardForm && <BoardForm/>}
        {this.props.showLoginForm && <LoginForm/>}
        {this.props.showSignupForm && <SignupForm/>}
        {this.props.showPermissionForm && <PermissionForm/>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showCardForm: state.pop.showCardForm,
  showBoardForm: state.pop.showBoardForm,
  showLoginForm: state.pop.showLoginForm,
  showSignupForm: state.pop.showSignupForm,
  showPermissionForm: state.pop.showPermissionForm
})

const mapDispatchToProps = dispatch => ({
  closeForms: () => dispatch(closeForms())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forms);