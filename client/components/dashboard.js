import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, List, Header, Button } from 'semantic-ui-react';
import * as actions from '../actions';
import SidebarDashboard from './sidebar_dashboard';
import Navbar from './navbar';

class Dashboard extends Component {

  memberCount() {
    const memberCnt = this.props.dashboardData.members.length;
    return memberCnt;
  }

  leadCount() {
    const leadCnt = this.props.dashboardData.leads.length;
    return leadCnt;
  }


  render() {
    console.log('this.props', this.props);
    if (!this.props.dashboardData) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <Navbar />
        <br />
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column width={5}>
              <SidebarDashboard />
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as="h3" color="blue">
                현재 지점: {this.props.dashboardData.name}
              </Header>
              <List selection verticalAlign="middle">
                입주 인원: {this.memberCount()} (명)
              </List>
              <List selection verticalAlign="middle">
                잠재 고객: {this.leadCount()} (명)
              </List>

            </Grid.Column>
          </Grid.Row>
          <Grid.Row>hellow world</Grid.Row>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    dashboardData: state.dashboard.data,
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
