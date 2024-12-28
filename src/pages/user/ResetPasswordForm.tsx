import SubmitButton from '@/components/SubmitButton';
import { useResetPasswordMutation } from '@/features/auth/authApiSlice';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { Form, Input, message } from 'antd';

interface IUserPassword {
  password: string;
}

function ResetPasswordForm() {
  const [messageApi, contextHolder] = message.useMessage();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { id } = useIsNew();

  const onFinish = async (values: IUserPassword) => {
    console.log('values', values);

    try {
      await resetPassword({ id: id!, password: values.password });
      messageApi.success('Update successfully');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        name='reset_password'
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        initialValues={{ password: '' }}
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item<IUserPassword>
          label='Açar sözüni çalyş'
          name='password'
          rules={[{ required: false, message: 'Please input email!' }]}
          tooltip='Açar sözüni çalyşmak isleseňiz'
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 22, span: 2 }}>
          <SubmitButton loading={isLoading} />
        </Form.Item>
      </Form>
    </>
  );
}

export default ResetPasswordForm;
