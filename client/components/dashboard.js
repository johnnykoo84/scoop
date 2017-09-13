import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, List, Header, Button } from 'semantic-ui-react';
import * as actions from '../actions';
import SidebarLeft from './sidebar';

class Dashboard extends Component {
  componentWillMount() {
    const selectedSpaceId = this.props.selectedSpace;
    this.props.fetchSpaceData(selectedSpaceId);
  }

  // memberCount() {
  //   return this.props.selectedSpace.spaces.map((member) => {
  //     return (
  //       <List.Item>
  //         <List.Icon name='user' />
  //         <List.Content>
  //           <List.Header>
  //             {member.name}
  //           </List.Header>
  //         </List.Content>
  //       </List.Item>
  //     );
  //   });
  // }



  render() {
    // console.log('this.props', this.props);
    if (!this.props.selectedSpace) {
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
                현재 지점: {this.props.selectedSpace.name}
              </Header>
              <List selection verticalAlign="middle">
                {/* {this.memberCount()} */}
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
    dashboardData: state.dashboard.dashboardData,
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
