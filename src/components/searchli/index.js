import React from 'react';

import styles from './style.less';
import { Button } from 'antd';

class SearchLi extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    const {
      searchListProps: { tableData, tableColumns },
      actionBtnGroup,
    } = this.props;
    const { list } = tableData;
    let fileldList = [];

    return (
      <div className={styles.list} key="searchList">
        <ul className={styles.list_header} key="searchListHeader">
          {tableColumns.map(obj => {
            fileldList.push(obj.dataIndex);
            return <li key={`searchListHeader_${obj.dataIndex}`}>{obj.title}</li>;
          })}
          {actionBtnGroup && actionBtnGroup.length != 0 ? (
            <li key="searchListHeader_operation">操作</li>
          ) : (
            ''
          )}
        </ul>
        {list.map((idx, i) => {
          return (
            <ul className={styles.list_content} key={`searchListContent_${i}`}>
              {fileldList.map((key, j) => {
                return <li key={`searchListContent_${i}_${j}`}>{list[i][key]}</li>;
              })}
              {actionBtnGroup && actionBtnGroup.length != 0 ? (
                <li key="searchListContent_operation">
                  {actionBtnGroup.map(obj => {
                    <Button type="primary">{obj.text}</Button>;
                  })}
                </li>
              ) : (
                ''
              )}
            </ul>
          );
        })}
      </div>
    );
  }
}

export default SearchLi;
