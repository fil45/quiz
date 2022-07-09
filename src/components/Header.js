import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.location.pathname,
    };
  }

  handleMenuClick = e => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <div style={{ marginBottom: '20px' }}>
        <Menu
          onClick={this.handleMenuClick}
          selectedKeys={[this.state.current]}
          mode='horizontal'
        >
          <Menu.Item key='/'>
            <Icon type='appstore' />
            <Link style={{ display: 'inline' }} to='/'>
              Testing
            </Link>
          </Menu.Item>
          <Menu.Item key='/add'>
            <Icon type='plus' />
            <Link style={{ display: 'inline' }} to='/add'>
              Add question
            </Link>
          </Menu.Item>
          <Menu.Item key='/manager'>
            <Icon type='setting' />
            <Link style={{ display: 'inline' }} to='/manager'>
              Questions manager
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default withRouter(Header);
