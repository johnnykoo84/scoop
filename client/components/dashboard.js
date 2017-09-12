import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, List, Header, Button } from 'semantic-ui-react';
import * as actions from '../actions';
import SidebarLeft from './sidebar';

class Dashboard extends Component {
  componentWillMount() {
    this.props.fetchDashboardInfo();
  }

  memberCount() {
    return this.props.dashboardInfo.spaces.map((member) => {
      return (
        <List.Item>
          <List.Icon name='user' />
          <List.Content>
            <List.Header>
              {member.name}
            </List.Header>
          </List.Content>
        </List.Item>
      );
    });
  }



  render() {
    // console.log('this.props', this.props);
    if (!this.props.dashboardInfo) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column width={5}>
              <SidebarLeft />
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as="h3" color="blue">
                현재 지점: {this.props.dashboardInfo.name}
              </Header>
              <List selection verticalAlign="middle">
                {this.memberCount()}
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
    dashboardInfo: state.dashboard.info,
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
