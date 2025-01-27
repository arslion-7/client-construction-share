import { dateFormat } from '@/utils/formats';
import { DatePicker, Form, InputNumber } from 'antd';
import SubmitButton from '../button/SubmitButton';
import { ICert } from '@/features/generalTypes';
import dayjs from 'dayjs';
import { useFocusInput } from './hooks';

interface ICertContent {
  cert: ICert;
  onFinish: (values: ICert) => Promise<void>;
  loading: boolean;
}

const CertContent = ({ cert, loading, onFinish }: ICertContent) => {
  const [form] = Form.useForm<ICert>();

  const focusInput = useFocusInput();

  return (
    <Form
      form={form}
      initialValues={{
        cert_number: cert.cert_number,
        cert_date: cert.cert_date && dayjs(cert.cert_date),
      }}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
      <Form.Item label='Şahadatnama belgisi' name='cert_number' hasFeedback>
        <InputNumber ref={focusInput} style={{ width: 200 }} />
      </Form.Item>
      <Form.Item label='Şahadatnama sene' name='cert_date' hasFeedback>
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
        <SubmitButton loading={loading} />
      </Form.Item>
    </Form>
  );
};

export default CertContent;
