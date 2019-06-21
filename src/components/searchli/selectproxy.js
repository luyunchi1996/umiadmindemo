import React from 'react';

import { Select } from 'antd';

const { Option } = Select;

class SelectProxy extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { selectdata, propskey, ...otherProps } = this.props;
    return (
      <Select key={`${propskey}_select`} placeholder="请选择" allowClear {...otherProps}>
        {selectdata.map(obj => {
          return (
            <Option value={obj.id} key={`${propskey}_select_${obj.id}`}>
              {obj.name}
            </Option>
          );
        })}
      </Select>
    );
  }
}

export default SelectProxy;
