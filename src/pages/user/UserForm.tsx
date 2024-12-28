import SubmitButton from '@/components/SubmitButton';
import { IUserResponse } from '@/features/users/types';
import { Form, Input, Select } from 'antd';

export default function UserForm({ user }: { user: IUserResponse }) {
  const [form] = Form.useForm<IUserResponse>();

  return (
    <Form
      form={form}
      name='user-form'
      initialValues={user}
      // onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
      <Form.Item name='email' label='email'>
        <Input />
      </Form.Item>
      <Form.Item name='full_name' label='Doly ady'>
        <Input />
      </Form.Item>
      <Form.Item name='phone_number' label='Telefon belgisi'>
        <Input />
      </Form.Item>
      <Form.Item name='role' label='Roly'>
        <Select
          options={[
            { label: 'admin', value: 'admin' },
            { label: 'ulanyjy paýly', value: 'user_share' },
            { label: 'başlyk paýly', value: 'boss_share' }
          ]}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 22, span: 2 }}>
        <SubmitButton
        // loading={loading}
        />
      </Form.Item>
    </Form>
  );
}
