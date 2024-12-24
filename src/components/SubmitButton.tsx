import { useIsNew } from '@/utils/hooks/paramsHooks';
import { EditOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';

export default function SubmitButton({ loading }: { loading?: boolean }) {
  const { isNew } = useIsNew();
  return (
    <Button
      loading={loading}
      type='primary'
      htmlType='submit'
      size='large'
      icon={isNew ? <PlusCircleFilled /> : <EditOutlined />}
    >
      {isNew ? 'Täze goş' : 'Üýtget'}
    </Button>
  );
}
