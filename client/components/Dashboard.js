import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import Navbar from './Navbar';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Navbar />
        This is a Dashboard page
      </div>
    )
  }
}

export default Dashboard;
