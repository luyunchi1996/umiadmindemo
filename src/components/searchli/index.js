import React from 'react';

import styles from './style.less';

import { Button } from 'antd';
import SearchPanel from './searchpanel';
import Lists from './lists';

class SearchLi extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    const { searchListProps, actionBtnGroup, searchPanelProps } = this.props;

    return (
      <div>
        <SearchPanel searchPanelProps={searchPanelProps} />
        <Lists searchListProps={searchListProps} actionBtnGroup={actionBtnGroup} />
      </div>
    );
  }
}

export default SearchLi;
