import { CheckCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface SelectButtonProps {
  loading: boolean;
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  selected?: boolean;
}

export default function SelectButton({
  loading,
  onClick,
  selected
}: SelectButtonProps) {
  return (
    <Button
      loading={loading}
      onClick={onClick}
      icon={<CheckCircleOutlined />}
      type={selected ? 'primary' : 'default'}
    >
      {selected ? 'Saýlanan' : 'Saýla'}
    </Button>
  );
}
