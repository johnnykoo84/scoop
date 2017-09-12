import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

class SidebarLeft extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted pointing vertical>
        <Menu.Item name='지점 선택' active={activeItem === '지점 선택'} onClick={this.handleItemClick} />
        <Menu.Item name='쪽지' active={activeItem === '쪽지'} onClick={this.handleItemClick} />
        <Menu.Item name='기타' active={activeItem === '기타'} onClick={this.handleItemClick} />
      </Menu>
    )
  }
}
export default SidebarLeft;
