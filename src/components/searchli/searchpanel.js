import React from 'react';

import { Form, Button, Row, Col, Popover, Checkbox, Icon } from 'antd';
import styles from './style.less';
import getControlHandler from './inputHOC';

const FormItem = Form.Item;

@Form.create()
class SearchPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleReset = () => {};

  handleSearchProxy = e => {
    const {
      form,
      searchPanelProps: { handleSearch },
    } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
      };
      handleSearch(values);
    });
  };

  render() {
    const {
      searchPanelProps: { searchEntity, handleAdd },
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div>
        {_renderRow(searchEntity)}
        <div>
          <Button onClick={() => handleAdd()} type="primary">
            新增
          </Button>
          <Button onClick={e => this.handleSearchProxy(e)} type="primary">
            查询
          </Button>
          <Button onClick={this.handleReset}>重置</Button>
        </div>
      </div>
    );
    function _renderRow(data) {
      let ceilRow = [];
      for (let y = 0; y < Math.ceil(data.length / 3); y++) {
        let cols = [];
        for (let x = 0; x < 3; x++) {
          let z = y * 3 + x;
          let obj = data[z];
          if (!obj) continue;
          cols.push(
            <Col md={6} sm={24} key={`formItem_col_${z}`}>
              <FormItem key={`formItem_${z}`} label={obj.label}>
                {getFieldDecorator(obj.key, {
                  initialValue: obj.initialValue,
                })(_getInputHandler({ selectData: obj.selectData, key: obj.key, type: obj.type }))}
              </FormItem>
            </Col>,
          );
        }
        const row = (
          <Row key={`formItemRow_${y}`} className={styles.searchItems}>
            {cols}
          </Row>
        );
        ceilRow.push(row);
      }
      return ceilRow;
    }
    function _getInputHandler(data) {
      const { selectData, type, key } = data;
      const NewHocComponent = getControlHandler(type);
      if (!NewHocComponent) return '';
      return (
        <NewHocComponent
          key={`hoccomponent_${key}`}
          propskey={`hoccomponent_${key}`}
          selectdata={selectData}
        />
      );
    }
  }
}

export default SearchPanel;
