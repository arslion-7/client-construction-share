import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

export default function Login() {
  const onFinish = async (values) => {};

  const onFinishFailed = async () => {};

  return (
    <Form
      name='login-form'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item
        name='email'
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input
          autoFocus
          style={{ minWidth: 280 }}
          prefix={<UserOutlined />}
          placeholder='Email'
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          style={{ minWidth: 280 }}
          prefix={<LockOutlined />}
          placeholder='Password'
        />
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          icon={<LoginOutlined />}
          htmlType='submit'
          block
          style={{ minWidth: 280 }}
          // loading={isLoading}
        >
          Girmek
        </Button>
      </Form.Item>
    </Form>
  );
}
