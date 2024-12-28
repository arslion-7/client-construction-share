import { useSignInMutation } from '@/features/auth/authApiSlice';
import { IRequestUser } from '@/features/auth/types';
import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';

export default function SignIn() {
  const [messageApi, contextHolder] = message.useMessage();

  const [signIn, { isLoading }] = useSignInMutation();

  const onFinish = async (values: IRequestUser) => {
    try {
      const jwt = await signIn(values).unwrap();
    } catch (error) {
      console.log('error', error);
      // messageApi.error(error.data.error);
    }
  };

  const onFinishFailed = async () => {};

  return (
    <>
      {' '}
      {contextHolder}
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
            loading={isLoading}
          >
            Girmek
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
