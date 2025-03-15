import { IShareholder, IPhone } from '@/features/shareholders/types';
import { useUpdateShareholderPhonesMutation } from '@/features/shareholders/shareholdersApiSlice';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { Button, Form, Input, Select, Space } from 'antd';
import SubmitButton from '@/components/button/SubmitButton';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface IProps {
  shareholder: IShareholder;
}

export default function ShareholderPhones({ shareholder }: IProps) {
  const { id } = useIsNew();
  const { messageApi } = useMessageApi();

  const [form] = Form.useForm();

  const [updatePhones, { isLoading: isLoadingUpdatePhones }] =
    useUpdateShareholderPhonesMutation();

  const onFinish = async (values: { phones: IPhone[] }) => {
    console.log('values', values);
    try {
      await updatePhones({
        id: id!,
        ...values,
      });
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
      initialValues={shareholder}
      onFinish={onFinish}
      // labelCol={{ span: 4 }}
      wrapperCol={{ span: 24 }}
    >
      <Form.List name='phones'>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: 'flex', marginBottom: 8 }}
                align='baseline'
              >
                <Form.Item
                  {...restField}
                  name={[name, 'kind']}
                  rules={[{ required: true, message: 'Görnüşini giriz' }]}
                >
                  <Select
                    style={{ width: 100 }}
                    options={['eli', 'öýi', 'işi'].map((k) => ({
                      value: k,
                      label: k,
                    }))}
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'number']}
                  rules={[{ required: true, message: 'Belgisini giriz' }]}
                >
                  <Input placeholder='00-00-00-00' prefix='+993' />
                </Form.Item>
                <Form.Item {...restField} name={[name, 'owner']}>
                  <Input placeholder='Eýesi' />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type='dashed'
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Telefon belgi
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
        <SubmitButton loading={isLoadingUpdatePhones} size='middle' />
      </Form.Item>
    </Form>
  );
}
