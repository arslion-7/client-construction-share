import { CheckCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface SelectButtonProps {
  loading: boolean;
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export default function SelectButton({ loading, onClick }: SelectButtonProps) {
  return (
    <Button loading={loading} onClick={onClick} icon={<CheckCircleOutlined />}>
      Saýla
    </Button>
  );
}
