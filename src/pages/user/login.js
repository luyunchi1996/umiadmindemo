import React from 'react';

import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import store from 'store';
import { router } from 'umi';
import styles from './login.less';




@connect(({user}) => ({
    user
}))

class UserLogin extends React.PureComponent {
  constructor(props) {
        super(props);
        this.state = {
        };
      }

  handleSubmit = e => {
    const {form} = this.props
    const {
        dispatch
      } = this.props;
    
    e.preventDefault();
    form.validateFields((err) => {
      if (!err) {
        dispatch({
             type:"user/userLogin",
             success:(response)=>{
                store.set('token', response.token);
                router.push("/")
             }
        })

      }          
    });
  };

  render() {
    const {
        form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.login_form}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入你的用户名!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入你的密码!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>自动登录</Checkbox>)}
          <a className={styles.login_form_forgot} href="">
            忘记密码?
          </a>
          <Button type="primary" htmlType="submit" className={styles.login_form_button}>
            登录
          </Button>
          <a href="">注册</a>
        </Form.Item>
      </Form>
    );
  }
}

const userLoginFrom = Form.create()(UserLogin)
export default connect()(userLoginFrom);

