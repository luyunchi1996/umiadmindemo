import React from 'react';

import { connect } from 'dva';

// eslint-disable-next-line import/no-unresolved
import Avatar from './AvatarDropdown';
import styles from './index.less';

class GlobalHeaderRight extends React.PureComponent {
  render() {
    const { theme, layout } = this.props;
    let className = styles.right;

    if (theme === 'dark' && layout === 'topmenu') {
      className = `${styles.right}  ${styles.dark}`;
    }

    return (
      <div className={className}>
        <Avatar />
      </div>
    );
  }
}

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
