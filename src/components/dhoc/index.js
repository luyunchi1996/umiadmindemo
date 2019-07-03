// demo
import React from 'react';

export default function d(name, p = () => {}) {
  return function c(Component) {
    return class AuthOper extends Component {
      constructor(props) {
        super(props);
        this.state = {};
      }

      setAuthBtn = opearList => {
        opearList();
        return '';
      };

      renderAuthOpeator = () => '';

      render() {
        const newProps = {
          auth: { setAuthBtn: this.setAuthBtn, renderAuthOpeator: this.renderAuthOpeator },
          ...this.props,
        };
        return <Component {...newProps} />;
      }
    };
  };
}
