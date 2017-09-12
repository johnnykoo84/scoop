import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import * as actions from '../actions';
import SidebarLeft from './sidebar';

class Dashboard extends Component {
  componentWillMount() {
    this.props.fetchDashboardInfo();
  }

  renderSpaceList() {
    return this.props.dashboardInfo.spaces.map((space) =>
    <List.Item>
      <List.Header>
        {space.name}
      </List.Header>
    </List.Item>
    );
  }

  render() {
    // console.log('this.props', this.props);
    if (!this.props.dashboardInfo) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <SidebarLeft />
        <br />

        <h2>{this.props.dashboardInfo.name} 관리자 페이지 입니다</h2>
        <br />
        <List selection verticalAlign="middle">
          {this.renderSpaceList()}
        </List>
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
