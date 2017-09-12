import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Menu, Button, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = { activeItem: '' };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.renderNavbar = this.renderNavbar.bind(this);
  }

  handleItemClick(e, { name }) {
    console.log('item clicked', name);
    this.setState({ activeItem: name });
  }

  renderNavbar() {
    const { activeItem } = this.state
    console.log('activeIOtem', activeItem)
    if (!this.props.authenticated) {
      return (
        <Menu inverted borderless color="yellow" width={5}>
          <Menu.Item
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            <Link to="/"><h1>scoop</h1></Link>
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item
              name="features"
              active={activeItem === 'features'}
              onClick={this.handleItemClick}
            >
              <Link to="/features"><h3>기능</h3></Link>
            </Menu.Item>

            <Menu.Item
              name="pricing"
              active={activeItem === 'pricing'}
              onClick={this.handleItemClick}
            >
              <Link to="/pricing"><h3>가격</h3></Link>
            </Menu.Item>
            <Menu.Item
              name="sign up"
              active={activeItem === 'sign Up'}
              onClick={this.handleItemClick}
            >
              <Link to="/signup"><h3>회원가입</h3></Link>
            </Menu.Item>

            <Menu.Item
              name="sign in"
              active={activeItem === 'sign In'}
              onClick={this.handleItemClick}
            >
              <Link to="/signin"><h3>로그인</h3></Link>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      );
    }
    return (
      <Menu>
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
          <Link to="/"><h1>scoop</h1></Link>
        </Menu.Item>

        <Menu.Item
          position="right"
          name="sign out"
          active={activeItem === 'sign out'}
          onClick={this.handleItemClick}
        >
          <Link to="/signout"><h3>로그아웃</h3></Link>
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    // const { activeItem } = this.state

    return (
      <div>
        {this.renderNavbar()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Navbar);
