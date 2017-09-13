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

  handleSelectSpace(e, spaceName) {
    console.log('handleSelectSpace clicked key=', spaceName);
    this.props.fetchSpaceData(spaceName, () => {
      this.props.history.push('/dashboard');
    });
  }

  renderSpaceList() {
    return this.props.spaceListInfo.spaces.map((space, i) => {
      return (
        <List.Item>
          <List.Icon name="building" />
          <List.Content>
            <List.Header
              key={space.name}
              onClick={(e) => this.handleSelectSpace(e, space.name)}
            >
              {space.name}
            </List.Header>
          </List.Content>
        </List.Item>
      );
    });
  }

  render() {
    console.log('this.props.spaceListInfo', this.props.spaceListInfo);
    if (!this.props.spaceListInfo) {
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
                {this.props.spaceListInfo.name} 지점 선택
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
    spaceListInfo: state.selectSpace.info,
  };
}

export default connect(mapStateToProps, actions)(SelectSpace);
