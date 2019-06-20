import React from 'react';
import { router } from 'umi';
import store from 'store';
import { Spin } from 'antd';

class CheckUser extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      location: { query },
    } = this.props;
    store.set('userInfo', {
      id: '12',
      userName: 'admin',
      role: '1',
    });
    if (query.path) router.push(query.path);
    else router.push('/');
  }

  render() {
    return <Spin size="large" />;
  }
}
export default CheckUser;
