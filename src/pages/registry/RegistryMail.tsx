import { useFocusInput } from '@/components/common/hooks';
import SubmitButton from '@/components/button/SubmitButton';
import { IRegistry, IRegistryMail } from '@/features/registries/types';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { DatePicker, Form, Input, InputNumber } from 'antd';
import { dateFormat } from '@/utils/formats';
import dayjs from 'dayjs';
import { useUpdateRegistryMailMutation } from '@/features/registries/registriesApiSlice';

export default function RegistryMail({ registry }: { registry: IRegistry }) {
  const { id } = useIsNew();
  const { messageApi } = useMessageApi();
  const focusInput = useFocusInput();

  const [form] = Form.useForm<IRegistryMail>();

  const [updateRegistryMail, { isLoading: isLoadingUpdate }] =
    useUpdateRegistryMailMutation();

  const onFinish = async (values: IRegistryMail) => {
    console.log('values', values);
    try {
      await updateRegistryMail({ id: id!, ...values });
      messageApi.success('Reýestr hat täzelendi');
    } catch (error) {
      console.log('error', error);
      messageApi.error('Reýestr hat täzelenende ýalňyşlyk ýüze çykdy');
    }
  };

  return (
    <Form
      form={form}
      name='registry_update_registry_mail_form'
      // layout='inline'
      initialValues={{
        mail_date: registry.mail_date && dayjs(registry.mail_date),
        mail_number: registry.mail_number,
        delivered_date:
          registry.delivered_date && dayjs(registry.delivered_date),
        count: registry.count,
        queue: registry.queue,
        min_to_mud_date:
          registry.min_to_mud_date && dayjs(registry.min_to_mud_date),
      }}
      onFinish={onFinish}
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 4 }}
    >
      <Form.Item<IRegistryMail> name='mail_date' label='Hatyň senesi'>
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item<IRegistryMail>
        label='Hat belgisi'
        name='mail_number'
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item<IRegistryMail>
        label='Tabşyrylan senesi'
        name='delivered_date'
        hasFeedback
      >
        <DatePicker ref={focusInput} format={dateFormat} />
      </Form.Item>
      <Form.Item<IRegistryMail> label='Sany' name='count' hasFeedback>
        <InputNumber style={{ width: 150 }} />
      </Form.Item>
      <Form.Item<IRegistryMail> label='Tapgyr' name='queue' hasFeedback>
        <InputNumber style={{ width: 150 }} />
      </Form.Item>
      <Form.Item<IRegistryMail>
        label='Min-den müd-e tab. senesi'
        name='min_to_mud_date'
        hasFeedback
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
        <SubmitButton loading={isLoadingUpdate} size='middle' />
      </Form.Item>
    </Form>
  );
}
