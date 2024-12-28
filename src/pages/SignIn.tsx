import { useSignInMutation } from '@/features/auth/authApiSlice';
import { IRequestUser } from '@/features/auth/types';
import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router';

export default function SignIn() {
  const navigate = useNavigate();

  const [signIn, { isLoading }] = useSignInMutation();

  const onFinish = async (values: IRequestUser) => {
    try {
      await signIn(values).unwrap();
      navigate('/registries');
    } catch (error) {
      console.log('error', error);
    }
  };

  const onFinishFailed = async () => {};

  return (
    <Form
      name='sign-in-form'
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
        rules={[{ required: true, message: 'Email salgyňyzy giriziň!' }]}
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
        rules={[{ required: true, message: 'Açar sözüni giriziň!' }]}
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
  );
}
