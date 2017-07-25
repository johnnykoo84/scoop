import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router';

export default class MenuExampleBasic extends Component {
  constructor(props) {
    super(props);

    this.state = { activeItem: 'Home' };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });

  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item
          name="Home"
          active={activeItem === 'Home'}
          onClick={this.handleItemClick}
        >
          <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.Item
          name="Features"
          active={activeItem === 'Features'}
          onClick={this.handleItemClick}
        >
          <Link to="/features">Features</Link>
        </Menu.Item>

        <Menu.Item
          name="Pricing"
          active={activeItem === 'Pricing'}
          onClick={this.handleItemClick}
        >
          <Link to="/pricing">Pricing</Link>
        </Menu.Item>

        <Menu.Item
          name="SignUp"
          active={activeItem === 'SignUp'}
          onClick={this.handleItemClick}
        >
          <Link to="/signup">SignUp</Link>
        </Menu.Item>

        <Menu.Item
          name="LogIn"
          active={activeItem === 'LogIn'}
          onClick={this.handleItemClick}
        >
          <Link to="/login">Login</Link>
        </Menu.Item>
      </Menu>
    );
  }
}
