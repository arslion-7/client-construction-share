import SubmitButton from '@/components/button/SubmitButton';
import {
  useCreateShareholderPropertyMutation,
  useUpdateShareholderPropertyMutation,
} from '@/features/shareholderProperties/shareholderPropertiesApiSlice';
import { IShareholderProperty } from '@/features/shareholderProperties/types';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { Form, Input, InputNumber } from 'antd';

const width = 300;

export default function ShareholderPropertyForm({
  shareholderProperty,
}: {
  shareholderProperty?: IShareholderProperty;
}) {
  const { id } = useIsNew();

  const { messageApi } = useMessageApi();
  const [form] = Form.useForm();

  const [createShareholderProperty, { isLoading: isLoadingCreate }] =
    useCreateShareholderPropertyMutation();

  const [updateShareholderProperty, { isLoading: isLoadingUpdate }] =
    useUpdateShareholderPropertyMutation();

  const onCreate = async (values: IShareholderProperty) => {
    try {
      await createShareholderProperty({
        registryId: id!,
        shareholderProperty: { ...values },
      });
      messageApi.success('Paýçy emläk goşuldy.');
    } catch (error) {
      console.log('error on create', error);
      messageApi.error('Paýçy emläk goşulanda näsazlyk ýüze çykdy.');
    }
  };

  const onUpdate = async (values: IShareholderProperty) => {
    await updateShareholderProperty({
      shareholderProperty: values!,
      id: shareholderProperty!.id,
    });
    try {
      messageApi.success('Paýçy emläk täzelendi.');
    } catch (error) {
      console.log('Error on update docs', error);
      messageApi.error('Paýçy emläk täzelenende näsazlyk ýüze çykdy.');
    }
  };

  const onFinish = async (values: IShareholderProperty) => {
    if (!shareholderProperty) {
      await onCreate(values);
    } else {
      if (shareholderProperty) {
        await onUpdate(values);
      }
    }
  };

  return (
    <Form
      form={form}
      initialValues={shareholderProperty}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 24 }}
    >
      <Form.Item label='Desga görnüşi' name='building_type' hasFeedback>
        <Input />
      </Form.Item>
      <Form.Item label='Bölüm' name='part' hasFeedback>
        <InputNumber style={{ width }} />
      </Form.Item>
      <Form.Item label='Jaý' name='building' hasFeedback>
        <InputNumber style={{ width }} />
      </Form.Item>
      <Form.Item label='Girelge' name='entrance' hasFeedback>
        <InputNumber style={{ width }} />
      </Form.Item>
      <Form.Item label='Gat' name='floor' hasFeedback>
        <InputNumber style={{ width }} />
      </Form.Item>
      <Form.Item label='Öý' name='apartment' hasFeedback>
        <InputNumber style={{ width }} />
      </Form.Item>
      <Form.Item label='Otag sany' name='room_count' hasFeedback>
        <InputNumber style={{ width }} />
      </Form.Item>
      <Form.Item label='Meýdan' name='square' hasFeedback>
        <InputNumber style={{ width }} decimalSeparator=',' prefix='m2' />
      </Form.Item>
      <Form.Item label='Bahasy' name='price' hasFeedback>
        <InputNumber style={{ width }} decimalSeparator=',' prefix='man.' />
      </Form.Item>
      <Form.Item label='Baha 1m2' name='price_1m2' hasFeedback>
        <InputNumber style={{ width }} decimalSeparator=',' prefix='man.' />
      </Form.Item>
      {/* <Form.Item label='number' name='building_ident_number' hasFeedback>
        <InputNumber style={{ width: 200 }} />
      </Form.Item> */}
      <Form.Item label='Goşmaça maglumat' name='additional_info' hasFeedback>
        <Input.TextArea rows={5} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
        <SubmitButton
          loading={isLoadingCreate || isLoadingUpdate}
          size='middle'
        />
      </Form.Item>
    </Form>
  );
}
