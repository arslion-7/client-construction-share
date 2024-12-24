import FormCard from '@/components/FormCard';
import { rules } from '@/utils/rules';
import { Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const FormOrgContent = () => {
  return (
    <FormCard title='org_info'>
      <Form.Item
        name='org_name'
        rules={[rules.non_required()]}
        label='org_name'
      >
        <TextArea rows={2} />
      </Form.Item>
      <Form.Item
        name='head_position'
        rules={[rules.non_required()]}
        label='head_position'
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='head_full_name'
        rules={[rules.non_required()]}
        label='head_full_name'
      >
        <Input />
      </Form.Item>
      <Form.Item name='org_additional_info' rules={[rules.non_required()]}>
        <TextArea rows={2} placeholder='additional_info' />
      </Form.Item>
    </FormCard>
  );
};

export default FormOrgContent;
