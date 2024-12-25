import FormCard from '@/components/FormCard';
import { dateFormat } from '@/utils/formats';
import { rules } from '@/utils/rules';
import { DatePicker, Form, InputNumber } from 'antd';
import SubmitButton from '../SubmitButton';

const CertContent = () => {
  return (
    <FormCard title='cert'>
      <>
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
          <SubmitButton // loading={isLoadingCreate || isLoadingUpdate}
          />
        </Form.Item>
      </>
    </FormCard>
  );
};

export default CertContent;
