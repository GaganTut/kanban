import React, {Component} from 'react';
import {connect} from 'react-redux';
import {closeForm} from '../../actions';
import CardForm from '../CardForm';
import BoardForm from '../BoardForm';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';

class Forms extends Component {

  componentWillMount() {
    this.props.loadApp();
  }


  render() {
    return (
      <div
      className="popup-form-div"
      >
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
  closeForm: () => dispatch(closeForm())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forms);