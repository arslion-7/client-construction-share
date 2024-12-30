import { useCreateRegistryMutation } from '@/features/registries/registriesApiSlice';
import { useMessageApi } from '@/utils/messages';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router';

export default function AddNewRegistry() {
  const navigate = useNavigate();
  const { messageApi } = useMessageApi();

  const [createRegistry, { isLoading: isLoadingCreate }] =
    useCreateRegistryMutation();

  const onCreate = async () => {
    const createdRegistry = await createRegistry().unwrap();
    messageApi.success('Reýestre täze ýazgy goşuldy');
    navigate(`/registries/${createdRegistry.id}`);
  };

  return (
    <Button
      icon={<PlusCircleOutlined />}
      onClick={() => onCreate()}
      loading={isLoadingCreate}
    >
      Täze ýazgy goş
    </Button>
  );
}
