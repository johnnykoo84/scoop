import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

class SidebarDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home'
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted pointing vertical>
        <Menu.Item name='회원' active={activeItem === '회원'} onClick={this.handleItemClick} />
        <Menu.Item name='계약' active={activeItem === '계약'} onClick={this.handleItemClick} />
        <Menu.Item name='사무실' active={activeItem === '사무실'} onClick={this.handleItemClick} />
        <Menu.Item name='대관' active={activeItem === '대관'} onClick={this.handleItemClick} />
        <Menu.Item name='관리' active={activeItem === '관리'} onClick={this.handleItemClick} />
        <Menu.Item name='기타' active={activeItem === '기타'} onClick={this.handleItemClick} />
      </Menu>
    )
  }
}
export default SidebarDashboard;
