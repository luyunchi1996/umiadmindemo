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

  render() {
    const {
      searchPanelProps: { searchEntity },
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const selectData = [
      { id: 1, name: 'name1' },
      { id: 2, name: 'name2' },
      { id: 3, name: 'name3' },
    ];
    return (
      <div>
        {searchEntity.map((obj, i) => {
          return (
            <FormItem key={`formItem_${i}`} label={obj.label}>
              {getFieldDecorator(obj.key, {
                initialValue: obj.initialValue,
              })(_getInputHandler({ selectData: selectData, key: obj.key, type: obj.type }))}
            </FormItem>
          );
        })}
      </div>
    );
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
