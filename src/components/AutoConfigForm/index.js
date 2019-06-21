import React, { PureComponent } from 'react';
import { Form, Row, Col } from 'antd';
import styles from './index.less';
import getControlHandler from './HOCControl';

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

class AutoConfigFrom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  showControl = (dataCols, tableData) => {
    const datas = dataCols;
    const { cellHeight, style, col } = this.props;
    const allspans = 24;

    function selectControl(type, key) {
      const NewHocComponent = getControlHandler(type);
      return (
        <NewHocComponent
          key={`${tableData[key]}_control`}
          value={tableData[key]}
          placeholder="暂无"
          readOnly
        />
      );
    }

    const spans = allspans / (col || 1);
    const n1 = datas.map(arr => {
      if (!Array.isArray(arr)) {
        const arrdata = arr.data;
        return (
          <Row key={guid()} gutter={allspans} className={styles['auto-from-row']}>
            {arrdata.map(adata => (
              <Col key={guid()} span={spans}>
                <Row key={guid()}>
                  {adata.map(adin => (
                    <Col key={`${adin.key}_col`} style={{ height: (cellHeight || 40) * adin.row }}>
                      <Form.Item
                        key={adin.key}
                        className={styles['auto-from-item']}
                        style={style}
                        label={adin.name}
                      >
                        {selectControl(adin.type, adin.key)}
                      </Form.Item>
                    </Col>
                  ))}
                </Row>
              </Col>
            ))}
          </Row>
        );
      }
      return (
        <Row key={guid()} gutter={allspans} className={styles['auto-from-row']}>
          {arr.map(v => (
            <Col key={guid()} style={{ height: cellHeight || 40 }} span={allspans / v.col}>
              <Form.Item
                key={guid() + v.key}
                className={`${styles['auto-from-item']} ${styles[v.colLabelClz]}`}
                style={style}
                label={v.name}
              >
                {selectControl(v.type, v.key)}
              </Form.Item>
            </Col>
          ))}
        </Row>
      );
    });
    return n1;
  };

  render() {
    const { fromModalData, col, tableData } = this.props;

    function processFromModalCol(data, cols) {
      // 1.传入data,data为 object类型, cols 列数
      if (!data && typeof data === 'object') return [];
      // 2.将其转为一维数组
      const keys = Object.keys(data);
      const dataMap = [];
      keys.forEach(key => {
        dataMap.push(data[key]);
      });
      let index = 0;
      const datasCols = [];
      while (index < dataMap.length) {
        let column = dataMap[index].col || cols;
        let row = dataMap[index].row || 1;

        const dataTemp = [];
        // 当 row 大于 1时根据 col值 获取 cols-col *row 个项作为一组
        if (row > 1) {
          const number = (cols - column) * row;

          dataMap[index].col = column;
          dataMap[index].row = row;
          dataTemp.push(dataMap[index]);
          index += 1;

          const group = [];

          for (let i = 0; i < number; i += 1) {
            if (dataMap[index]) {
              column = dataMap[index].col || cols;
              row = dataMap[index].row || 1;
              dataMap[index].col = column;
              dataMap[index].row = row;
              group.push(dataMap[index]);
            }
            index += 1;
          }
          datasCols.push({ data: [dataTemp, group] });
        } else {
          for (let i = 0; i < column; i += 1) {
            if (dataMap[index]) {
              dataMap[index].col = column;
              dataMap[index].row = row;
              if (column === 1) dataMap[index].colLabelClz = 'label-column-1';
              dataTemp.push(dataMap[index]);
            }
            index += 1;
          }
          datasCols.push(dataTemp);
        }
      }

      return datasCols;
    }

    const datasCols = processFromModalCol(fromModalData, col);
    return (
      <Form className={styles['auto-from-continer']}>{this.showControl(datasCols, tableData)}</Form>
    );
  }
}

export default AutoConfigFrom;
