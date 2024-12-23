import { PlusCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router';

export default function NewButton() {
  const navigate = useNavigate();

  return (
    <Button icon={<PlusCircleFilled />} onClick={() => navigate('new')}>
      Täze
    </Button>
  );
}
