import { dateFormat } from '@/utils/formats';
import { rules } from '@/utils/rules';
import { DatePicker, Form, Input } from 'antd';
import SubmitButton from '../SubmitButton';
import { IResolution } from '@/features/generalTypes';
import dayjs from 'dayjs';

interface IResolutionContent {
  resolution: IResolution;
  onFinish: (values: IResolution) => Promise<void>;
  loading: boolean;
}

const ResolutionContent = ({
  resolution,
  loading,
  onFinish
}: IResolutionContent) => {
  const [form] = Form.useForm<IResolution>();

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
          dayjs(resolution.resolution_end_date)
      }}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
      <Form.Item
        label='resolution_code'
        name='resolution_code'
        rules={[rules.non_required()]}
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='resolution_begin_date'
        name='resolution_begin_date'
        rules={[rules.non_required()]}
        hasFeedback
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item
        label='resolution_end_date'
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
