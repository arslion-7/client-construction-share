import { IRegistry } from '@/features/registries/types';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { Form } from 'antd';

export default function ShareholderProperty({
  registry,
}: {
  registry: IRegistry;
}) {
  const { id } = useIsNew();
  const { messageApi } = useMessageApi();
  const [form] = Form.useForm();

  const onFinish = async (values: { phones: IPhone[] }) => {
    console.log('values', values);
    try {
      messageApi.success('Paýçyň telefon belgileri täzelendi.');
    } catch (error) {
      console.log('Error on update docs', error);
      messageApi.error(
        'Paýçyň telefon belgileri täzelenende näsazlyk ýüze çykdy.'
      );
    }
  };

  return (
    <Form
      form={form}
      initialValues={registry}
      onFinish={onFinish}
      // labelCol={{ span: 4 }}
      wrapperCol={{ span: 24 }}
    ></Form>
  );
}
