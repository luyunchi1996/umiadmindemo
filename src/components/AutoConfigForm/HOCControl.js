import React, { PureComponent } from 'react';
import { Input, DatePicker } from 'antd';

// import InputControl from './InputControl';
import ItemControl from './ItemControl';

const fromControlItem = {
  input: Input,
  item: ItemControl,
  textarea: Input.TextArea,
  datePicker: DatePicker,
};

function getControlHandler(controlName) {
  const WarpperComponent = fromControlItem[controlName];

  return class HOCComponent extends PureComponent {
    render() {
      return <WarpperComponent {...this.props} />;
    }
  };
}
export default getControlHandler;
