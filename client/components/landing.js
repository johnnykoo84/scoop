import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Button } from 'semantic-ui-react';
import Navbar from './navbar';

class Landing extends Component {
  render() {
    if (this.props.authenticated) {
      return (
        <div>
          <Navbar />
          <h1>welcome! This is a landing page@@</h1>
          <h1><Link to="/selectspace">select your space</Link></h1>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar />
          <h1>This is a landing page@@</h1>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps)(Landing);
