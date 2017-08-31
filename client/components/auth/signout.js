import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser(() => {
      this.props.history.push('/');
    });
  }

  render() {
    console.log('signout clicked');

    return <div>Sorry to see you go...</div>;
  }
}

export default connect(null, actions)(Signout);
