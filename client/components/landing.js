import React, { Component } from 'react';
// import { Button } from 'semantic-ui-react';
import Navbar from './navbar';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <h1>This is a landing page@@</h1>
        <h1><Link to="/selectspace">select your space</Link></h1>
      </div>
    )
  }
}

export default Landing;
