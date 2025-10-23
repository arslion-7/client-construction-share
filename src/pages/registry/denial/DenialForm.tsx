import SubmitButton from '@/components/button/SubmitButton';
import { useUpdateRegistryDenialMutation } from '@/features/registries/registriesApiSlice';
import { IRegistryDenial } from '@/features/registries/types';
import { dateFormat } from '@/utils/formats';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { rules } from '@/utils/rules';
import { DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';

export default function DenialForm({ denial }: { denial: IRegistryDenial }) {
  const { id } = useIsNew();
  const { messageApi } = useMessageApi();
  const [form] = Form.useForm<IRegistryDenial>();

  const [updateRegistryDenial, { isLoading }] =
    useUpdateRegistryDenialMutation();

  const onFinish = async (values: IRegistryDenial) => {
    try {
      await updateRegistryDenial({ id: id!, ...values });
      messageApi.success('Ret maglumatlary üstünlikli täzelendi');
    } catch (error) {
      console.log('error', error);
      messageApi.error('Ret maglumatlaryny täzelenende ýalňyşlyk ýüze çykdy');
    }
  };

  return (
    <Form
      form={form}
      initialValues={{
        ...denial,
        denial_date:
          denial.denial_date && dayjs(denial.denial_date),
      }}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 24 }}
    >
      <Form.Item<IRegistryDenial>
        label='Ret sebäbi'
        name='denial_reason'
        hasFeedback
      >
        <Input.TextArea rows={3} placeholder='Ret sebäbini giriziň' />
      </Form.Item>
      <Form.Item
        label='Ret senesi'
        name='denial_date'
        rules={[rules.non_required()]}
        hasFeedback
      >
        <DatePicker format={dateFormat} placeholder='Ret senesini saýlaň' />
      </Form.Item>
      <Form.Item
        name='denial_additional_info'
        label='Goşmaça maglumat'
      >
        <Input.TextArea rows={4} placeholder='Goşmaça maglumat giriziň' />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
        <SubmitButton loading={isLoading} size='middle' />
      </Form.Item>
    </Form>
  );
}
