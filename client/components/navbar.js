import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = { activeItem: 'Home' };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.renderNavbar = this.renderNavbar.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });

  }

  renderNavbar() {
    const { activeItem } = this.state

    if (!this.props.authenticated) {
      return (
        <Menu>
          <Menu.Item
          name="home"
          active={activeItem === 'Home'}
          onClick={this.handleItemClick}
        >
          <Link to="/">홈</Link>
        </Menu.Item>

        <Menu.Item
          name="features"
          active={activeItem === 'Features'}
          onClick={this.handleItemClick}
        >
          <Link to="/features">기능</Link>
        </Menu.Item>

        <Menu.Item
          name="pricing"
          active={activeItem === 'Pricing'}
          onClick={this.handleItemClick}
        >
          <Link to="/pricing">가격</Link>
        </Menu.Item>

        <Menu.Item
          name="sign up"
          active={activeItem === 'Sign Up'}
          onClick={this.handleItemClick}
        >
          <Link to="/signup">회원가입</Link>
        </Menu.Item>

        <Menu.Item
          name="sign in"
          active={activeItem === 'Sign In'}
          onClick={this.handleItemClick}
        >
          <Link to="/signin">로그인</Link>
        </Menu.Item>
        </Menu>
    );
  } else {
    return (
        <Menu>
          <Menu.Item
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            <Link to="/">홈</Link>
          </Menu.Item>

          <Menu.Item
            name="dashboard"
            active={activeItem === 'dashboard'}
            onClick={this.handleItemClick}
          >
            <Link to="/dashboard">대쉬보드</Link>
          </Menu.Item>

          <Menu.Item
            name="sign out"
            active={activeItem === 'sign out'}
            onClick={this.handleItemClick}
          >
            <Link to="/signout">로그아웃</Link>
          </Menu.Item>
        </Menu>
      );
    }
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
