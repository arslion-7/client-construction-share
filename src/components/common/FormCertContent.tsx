import { dateFormat } from '@/utils/formats';
import { rules } from '@/utils/rules';
import { DatePicker, Form, InputNumber } from 'antd';
import SubmitButton from '../SubmitButton';
import { ICert } from '@/features/generalTypes';
import dayjs from 'dayjs';

interface ICertContent {
  cert: ICert;
  onFinish: (values: ICert) => Promise<void>;
  loading: boolean;
}

const CertContent = ({ cert, loading, onFinish }: ICertContent) => {
  const [form] = Form.useForm<ICert>();

  return (
    <Form
      form={form}
      initialValues={{
        cert_number: cert.cert_number,
        cert_date: dayjs(cert.cert_date),
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label='cert_number'
        name='cert_number'
        rules={[rules.non_required()]}
        hasFeedback
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label='cert_date'
        name='cert_date'
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

export default CertContent;
