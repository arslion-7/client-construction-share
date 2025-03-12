import SubmitButton from '@/components/button/SubmitButton';
import {
  useCreateReceiverMutation,
  useUpdateReceiverOrgMutation,
} from '@/features/receivers/receiversApiSlice';
import { IReceiver } from '@/features/receivers/types';
import { orgTypeOptions } from '@/utils/commonOptions';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { Form, Input, Select } from 'antd';
import { useNavigate } from 'react-router';

export default function ReceiverMain({ receiver }: { receiver: IReceiver }) {
  const { id, isNew } = useIsNew();
  const { messageApi } = useMessageApi();
  const navigate = useNavigate();

  const [form] = Form.useForm<IReceiver>();

  const [create, { isLoading: isLoadingCreate }] = useCreateReceiverMutation();

  const [update, { isLoading: isLoadingUpdate }] =
    useUpdateReceiverOrgMutation();

  const onFinish = async (values: IReceiver) => {
    if (isNew) {
      try {
        const createdReceiver = await create({ ...values }).unwrap();
        navigate(`/receivers/${createdReceiver.id}`);
        messageApi.success('Täze almaga gelen goşuldy');
      } catch (error) {
        console.log('error', error);
      }
    } else {
      try {
        await update({ id: id!, receiver: { ...values } });
        messageApi.success('Almaga gelen täzelendi');
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  return (
    <Form
      form={form}
      initialValues={receiver}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
      {/* <Form.Item name='t_b' label='Tertip belgisi'>
        <Input />
      </Form.Item> */}
      <Form.Item name='citizen_status' label='Gurama görnüşi'>
        <Select
          options={orgTypeOptions.map((orgType) => ({
            label: orgType,
            value: orgType,
          }))}
        />
      </Form.Item>
      <Form.Item name='org_name' label='Gurama ady'>
        <Input />
      </Form.Item>
      <Form.Item name='department' label='Bölümi'>
        <Input />
      </Form.Item>
      <Form.Item name='position' label='Wezipesi'>
        <Input />
      </Form.Item>
      <Form.Item name='firstname' label='Ady'>
        <Input />
      </Form.Item>
      <Form.Item name='lastname' label='Familiýasy'>
        <Input />
      </Form.Item>
      <Form.Item name='patronymic' label='Atasynyň ady'>
        <Input />
      </Form.Item>
      <Form.Item name='additional_info' label='Goşmaça maglumat'>
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
        <SubmitButton
          size='middle'
          loading={isLoadingCreate || isLoadingUpdate}
        />
      </Form.Item>
    </Form>
  );
}
