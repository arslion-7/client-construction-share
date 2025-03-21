import { IBuilding } from '@/features/buildings/types';
import {
  useCreateBuildingMutation,
  useUpdateBuildingAddressMutation,
} from '@/features/buildings/buildingsApiSlice';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useNavigate } from 'react-router';
import { useMessageApi } from '@/utils/messages';
import AreaForm, { IAreaStreetForm } from '@/components/form/AreaStreetForm';
import { getAreaStreetInitials } from '@/utils/convertors';

interface IProps {
  building: IBuilding;
}

export default function BuildingAddress({ building }: IProps) {
  const { id, isNew } = useIsNew();
  const navigate = useNavigate();
  const { messageApi } = useMessageApi();

  const [createBuilding, { isLoading: isLoadingCreate }] =
    useCreateBuildingMutation();

  const [updateAddress, { isLoading: isLoadingUpdateAddress }] =
    useUpdateBuildingAddressMutation();

  const onFinish = async (values: IAreaStreetForm) => {
    if (!isNew) {
      await updateAddress({
        id: id!,
        ...values,
      });
      messageApi.success('Desga täzelendi');
      return;
    }
    const createdBuilding = await createBuilding(values).unwrap();
    console.log('createdBuilding', createdBuilding);
    navigate(`/buildings/${createdBuilding.id}`);
    messageApi.success('Täze desga goşuldy');
  };

  return (
    <AreaForm
      initialValues={getAreaStreetInitials(isNew, building)}
      onFinish={onFinish}
      isSubmitLoading={isLoadingUpdateAddress || isLoadingCreate}
    />
  );
}
