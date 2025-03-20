import SubmitButton from '@/components/button/SubmitButton';
import { useUpdateRegistryDatesMutation } from '@/features/registries/registriesApiSlice';
import { IRegistry, IRegistryDates } from '@/features/registries/types';
import { dateFormat } from '@/utils/formats';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { DatePicker, Form } from 'antd';
import dayjs from 'dayjs';

export default function RegistryDatesForm({
  registry,
}: {
  registry: IRegistry;
}) {
  const { id } = useIsNew();

  const { messageApi } = useMessageApi();
  const [form] = Form.useForm();

  const [updateRegistryDates, { isLoading: isLoadingUpdateRegistryDates }] =
    useUpdateRegistryDatesMutation();

  const onFinish = async (values: IRegistryDates) => {
    try {
      await updateRegistryDates({ id: id!, ...values });
      messageApi.success('Seneler girizilendi!');
    } catch (error) {
      console.log('error', error);
      messageApi.error('Seneler girizilende näsazlyk ýüze çykdy!');
    }
    // if (!shareholderProperty) {
    //   await onCreate(values);
    // } else {
    //   if (shareholderProperty) {
    //     await onUpdate(values);
    //   }
    // }
  };

  return (
    <Form<IRegistryDates>
      layout='inline'
      form={form}
      initialValues={{
        reviewed_at: registry.reviewed_at && dayjs(registry.reviewed_at),
        registered_at: registry.registered_at && dayjs(registry.registered_at),
      }}
      onFinish={onFinish}
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 12 }}
    >
      <Form.Item<IRegistryDates>
        label='Seredilen senesi'
        name='reviewed_at'
        hasFeedback
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item<IRegistryDates>
        label='Hasaba alnan senesi'
        name='registered_at'
        hasFeedback
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
        <SubmitButton loading={isLoadingUpdateRegistryDates} size='middle' />
      </Form.Item>
    </Form>
  );
}
