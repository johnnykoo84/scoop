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

  renderSpaceList() {
    return this.props.dashboardInfo.spaces.map((space) => {
      return (
        <List.Item>
          <List.Icon name='building' />
          <List.Content>
            <List.Header>
              {space.name}
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
                {this.props.dashboardInfo.name} 지점 선택
              </Header>
              <List selection verticalAlign="middle">
                {this.renderSpaceList()}
              </List>
              <Button
                primary
              >
                <Link to="/addspace">지점 추가</Link>
              </Button>
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
