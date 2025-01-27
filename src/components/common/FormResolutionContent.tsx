import { dateFormat } from '@/utils/formats';
import { rules } from '@/utils/rules';
import { DatePicker, Form, Input } from 'antd';
import SubmitButton from '../button/SubmitButton';
import { IResolution } from '@/features/generalTypes';
import dayjs from 'dayjs';
import { useFocusInput } from './hooks';

interface IResolutionContent {
  resolution: IResolution;
  onFinish: (values: IResolution) => Promise<void>;
  loading: boolean;
}

const ResolutionContent = ({
  resolution,
  loading,
  onFinish,
}: IResolutionContent) => {
  const [form] = Form.useForm<IResolution>();

  const focusInput = useFocusInput();

  return (
    <Form
      form={form}
      initialValues={{
        resolution_code: resolution.resolution_code,
        resolution_begin_date:
          resolution.resolution_begin_date &&
          dayjs(resolution.resolution_begin_date),
        resolution_end_date:
          resolution.resolution_begin_date &&
          dayjs(resolution.resolution_end_date),
      }}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
      <Form.Item
        label='Ygtyýarnama belgisi'
        name='resolution_code'
        rules={[rules.non_required()]}
        hasFeedback
      >
        <Input ref={focusInput} />
      </Form.Item>
      <Form.Item
        label='Ygtyýarnama başy'
        name='resolution_begin_date'
        rules={[rules.non_required()]}
        hasFeedback
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item
        label='Ygtyýarnama soňy'
        name='resolution_end_date'
        rules={[rules.non_required()]}
        hasFeedback
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 22, span: 2 }}>
        <SubmitButton loading={loading} />
      </Form.Item>
    </Form>
  );
};

export default ResolutionContent;
