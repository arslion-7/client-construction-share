import { useIsNew } from '@/utils/hooks/paramsHooks';
import { EditOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

export default function SubmitButton({
  loading,
  size = 'large'
}: {
  loading?: boolean;
  size?: SizeType;
}) {
  const { isNew } = useIsNew();
  return (
    <Button
      loading={loading}
      type='primary'
      htmlType='submit'
      size={size}
      icon={isNew ? <PlusCircleFilled /> : <EditOutlined />}
    >
      {isNew ? 'Täze goş' : 'Üýtget'}
    </Button>
  );
}
