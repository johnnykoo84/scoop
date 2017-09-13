import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, List, Header, Button } from 'semantic-ui-react';
import * as actions from '../actions';
import SidebarLeft from './sidebar';

class SelectSpace extends Component {
  componentWillMount() {
    this.props.fetchSpaceList();
  }


  // render: function () {
  //   return (
  //     <ul onclick="{this._handleClick}">
  //       // ... render your items here without a click handler
  //       <li name="item-1" data-name="item-1" value="item-1">Item 1</li>
  //
  //     </ul>
  //   )
  // },
  // _handleClick: function (ev, refs) {
  //   // Access the value from ev.target
  //   var value = ev.target.value; // For "value" attribute
  //   // Access your custom data value using dataset
  //   var dataValue = ev.target.dataset.name; // For "data-name" attribute
  //   // Access the ref value
  //   var dataRef = ev.target.refs.name; // For "name" attribute
  // }


  getSpaceId(e, key) {
    console.log('getSpaceId clicked key=', key);
    this.props.updateCurrentSpaceId(key);
  }

  renderSpaceList() {
    return this.props.dashboardInfo.spaces.map((space, i) => {
      return (
        <List.Item>
          <List.Icon name='building' />
          <List.Content>
            <List.Header key={space._id} onClick={(e) => this.getSpaceId(e, space._id)}>
              {space.name}
            </List.Header>
          </List.Content>
        </List.Item>
      );
    });
  }

  render() {
    console.log('this.props.dashboardInfo', this.props.dashboardInfo);
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
    dashboardInfo: state.spacelist.info,
  };
}

export default connect(mapStateToProps, actions)(SelectSpace);
