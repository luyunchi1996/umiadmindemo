import RightContent from '@/components/GlobalHeader/RightContent';
import { connect } from 'dva';
import React from 'react';
import logo from '../assets/logo.svg';
import Authorized from '@/utils/Authorized';
import { formatMessage } from 'umi-plugin-react/locale';
import { BasicLayout as ProLayoutComponents } from '@ant-design/pro-layout';
import Link from 'umi/link';

class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  menuDataRender = menuList => {
    return menuList.map(item => {
      const localItem = {
        ...item,
        children: item.children ? this.menuDataRender(item.children) : [],
      };
      return Authorized.check(item.authority, localItem, null);
    });
  };

  footerRender = () => {
    return <span>&nbsp;</span>;
  };

  render() {
    const { dispatch, children, settings } = this.props;
    const handleMenuCollapse = payload =>
      dispatch &&
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    return (
      <ProLayoutComponents
        logo={logo}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => {
          return [
            {
              path: '/',
              breadcrumbName: formatMessage({
                id: 'menu.home',
                defaultMessage: 'Home',
              }),
            },
            ...routers,
          ];
        }}
        footerRender={this.footerRender}
        menuDataRender={this.menuDataRender}
        formatMessage={formatMessage}
        rightContentRender={rightProps => <RightContent {...rightProps} />}
        {...this.props}
        {...settings}
      >
        {children}
      </ProLayoutComponents>
    );
  }
}

export default connect(({ global, settings }) => ({
  global,
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
