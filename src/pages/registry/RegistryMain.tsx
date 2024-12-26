import { IRegistry } from '@/features/registries/types';
import { Button } from 'antd';
import { useNavigate } from 'react-router';

interface IRegistryMainProps {
  registry: IRegistry;
}

export default function RegistryMain({ registry }: IRegistryMainProps) {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        onClick={() =>
          navigate(`/general_contractors?registryId=${registry.id}`)
        }
      >
        Gen contractor choose
      </Button>
    </div>
  );
}
