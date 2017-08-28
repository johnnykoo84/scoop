import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Features extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div>
        <h1>This is Features page!!</h1>
        <p>{this.props.message}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.auth.message
  };
}

export default connect(mapStateToProps, actions)(Features);
