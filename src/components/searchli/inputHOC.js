import React, { PureComponent } from 'react';
import { Input, DatePicker, Select, Checkbox } from 'antd';
import SelectProxy from './selectproxy';
const fromControlItem = {
  input: Input,
  datePicker: DatePicker,
  select: SelectProxy,
};

function getControlHandler(controlName) {
  const WarpperComponent = fromControlItem[controlName];
  if (!WarpperComponent) return '';
  return class HOCComponent extends PureComponent {
    render() {
      return <WarpperComponent {...this.props}></WarpperComponent>;
    }
  };
}
export default getControlHandler;
