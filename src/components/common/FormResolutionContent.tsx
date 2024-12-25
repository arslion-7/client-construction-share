import FormCard from '@/components/FormCard';
import { dateFormat } from '@/utils/formats';
import { rules } from '@/utils/rules';
import { DatePicker, Form, Input } from 'antd';
import SubmitButton from '../SubmitButton';

const ResolutionContent = () => {
  return (
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
      <Form.Item wrapperCol={{ offset: 22, span: 2 }}>
        <SubmitButton // loading={isLoadingCreate || isLoadingUpdate}
        />
      </Form.Item>
    </>
  );
};

export default ResolutionContent;
