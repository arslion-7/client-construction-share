import FormCard from '@/components/FormCard';
import { dateFormat } from '@/utils/formats';
import { rules } from '@/utils/rules';
import { DatePicker, Form, Input } from 'antd';

const ResolutionContent = () => {
  return (
    <FormCard title='resolution'>
      <>
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
      </>
    </FormCard>
  );
};

export default ResolutionContent;
