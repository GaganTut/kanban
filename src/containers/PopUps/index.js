/*jshint esversion: 6*/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';

class PopUps extends Component {

  renderButtons = () => {
    console.log(this.props);

    return (<button>HELLO</button>)
  }

  render() {
    if (this.props.loggedIn) {
      return this.renderButtons();
    } else {
      return (<div></div>)
    }
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn
})

const mapDispatchToProps = (dispatch) => ({
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PopUps));