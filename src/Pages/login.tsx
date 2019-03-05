import * as React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import GlobalState from '../Containers'

interface Props {

}
interface State {
  tip: string;
}
export default Form.create<Props>()(
  class extends React.Component<Props & FormComponentProps, State> {
    state = {
      tip: ''
    };
    handleSubmit = (e: any) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
        const response = GlobalState.login(values.userName, values.password);
        console.log(response);
        if (response) {
//
        } else {
          this.setState({ tip: '用户名或密码错误！' });
        }
      });
    };

    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div id="login">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
            <Form.Item>
              <div style={{ color: 'red' }}>{this.state.tip}</div>
            </Form.Item>
          </Form>
        </div>
      );
    }
  }
);
