import React, { PureComponent } from 'react';
import styles from './index.less';

class ItemControl extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { value } = this.props;

    return <span className={styles['item-span']}>{value}</span>;
  }
}
export default ItemControl;
