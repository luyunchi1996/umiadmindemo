import React from 'react';

import styles from './style.less';
import { Button } from 'antd';

class Lists extends React.PureComponent {
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
                return (
                  <li key={`searchListContent_${i}_${j}`}>
                    {_valueRender(
                      list[i][key],
                      tableColumns[j].render,
                      tableColumns[j].otherFileds,
                      list[i],
                    )}
                  </li>
                );
              })}
              {actionBtnGroup && actionBtnGroup.length != 0 ? (
                <li key="searchListContent_operation">
                  {actionBtnGroup.map(obj => {
                    let data = list[i];
                    obj.index = i;
                    return _btnRender(data, obj);
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

    function _valueRender(value, func, otherFileds, obj) {
      let data = {};
      let fileds = [];
      data.value = value;
      data.otherFileds = {};
      if (otherFileds && otherFileds.length != 0)
        otherFileds.map(key => {
          data.otherFileds[key] = obj[key];
        });

      if (func && typeof func === 'function') return func(data);
      return value;
    }
    function _btnRender(data, operation) {
      if (operation.render && typeof operation.render === 'function') return operation.render(data);
      return (
        <Button
          type="primary"
          size="small"
          className={styles.btn}
          onClick={() => operation.handleBtnClick(data)}
          key={`operation_${operation.key}_${operation.index}`}
        >
          {operation.text}
        </Button>
      );
    }
  }
}

export default Lists;
