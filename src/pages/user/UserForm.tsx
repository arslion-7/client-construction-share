import SubmitButton from '@/components/button/SubmitButton';
import { IUser } from '@/features/users/types';
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from '@/features/users/usersApiSlice';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { Form, Input, Select } from 'antd';
import { useNavigate } from 'react-router';

export default function UserForm({ user }: { user: IUser }) {
  const [form] = Form.useForm<IUser>();
  const { isNew, id } = useIsNew();
  const navigate = useNavigate();
  const { messageApi } = useMessageApi();

  const [createUser, { isLoading: isLoadingCreate }] = useCreateUserMutation();
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();

  const onFinish = async (values: IUser) => {
    if (isNew) {
      try {
        const createdUser = await createUser(values).unwrap();
        console.log('createdUser', createdUser);
        navigate(`/users/${createdUser.id}`);
        messageApi.success('Create success');
      } catch (error) {
        console.log('error', error);
      }
    } else {
      try {
        await updateUser({ id: id!, user: values });
        messageApi?.success('Update success');
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  return (
    <>
      <Form
        form={form}
        name='user-form'
        initialValues={user}
        onFinish={onFinish}
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
              { label: 'başlyk paýly', value: 'boss_share' },
            ]}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 22, span: 2 }}>
          <SubmitButton loading={isLoadingCreate || isLoadingUpdate} />
        </Form.Item>
      </Form>
    </>
  );
}
