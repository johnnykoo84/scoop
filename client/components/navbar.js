import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Menu, Button, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = { activeItem: 'Home' };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.renderNavbar = this.renderNavbar.bind(this);
  }

  handleItemClick(e, { name }) {
    console.log('item clicked', name);
    this.setState({ activeItem: name });
  }

  renderNavbar() {
    const { activeItem } = this.state

    if (!this.props.authenticated) {
      return (
        <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            name="home"
            active={activeItem === 'Home'}
            onClick={this.handleItemClick}
          >
            <Link to="/">scoop</Link>
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
          <Menu.Menu position="right">
          <Menu.Item
            name="sign up"
            active={activeItem === 'Sign Up'}
            onClick={this.handleItemClick}
          >
            <Button primary>
              <Link to="/signup">회원가입</Link>
            </Button>
          </Menu.Item>

          <Menu.Item
            name="sign in"
            active={activeItem === 'Sign In'}
            onClick={this.handleItemClick}
          >
            <Button>
              <Link to="/signin">로그인</Link>
            </Button>
          </Menu.Item>
        </Menu.Menu>
        </Menu>
      </Segment>
      );
    }
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
          position="right"
          name="sign out"
          active={activeItem === 'sign out'}
          onClick={this.handleItemClick}
        >
          <Button>
            <Link to="/signout">로그아웃</Link>
          </Button>
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
