import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
// import { Button } from 'semantic-ui-react';

class Dashboard extends Component {
  componentWillMount() {
    this.props.fetchDashboardInfo();
  }

  renderDashboardInfo() {
    console.log('this.props', this.props);
    return this.props.dashboardInfo.spaces.map(space => <li>{space.name}</li>);
  }

  render() {
    console.log('this.props.dashboardInfo', this.props.dashboardInfo);
    return (
      <div>
        This is a Dashboard page
        <ul>
          {this.renderDashboardInfo()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state.dashboard.info', state.dashboard.info)
  return {
    dashboardInfo: state.dashboard.info,
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
