import { IBuilder } from '@/features/builders/types';
import {
  useCreateBuilderMutation,
  useUpdateBuilderAddressMutation
} from '@/features/builders/buildersApiSlice';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useNavigate } from 'react-router';
import { useMessageApi } from '@/utils/messages';
import { getAreaAddressInitials } from '@/utils/convertors';
import AreaForm, { IAreaAddressForm } from '@/components/form/AreaAddressForm';

interface IProps {
  builder: IBuilder;
}

export default function BuilderAddress({ builder }: IProps) {
  const { id, isNew } = useIsNew();
  const navigate = useNavigate();
  const { messageApi } = useMessageApi();

  const [createBuilder, { isLoading: isLoadingCreate }] =
    useCreateBuilderMutation();

  const [updateAddress, { isLoading: isLoadingUpdateAddress }] =
    useUpdateBuilderAddressMutation();

  const onFinish = async (values: IAreaAddressForm) => {
    if (!isNew) {
      await updateAddress({
        id: id!,
        ...values
      });
      messageApi.success('Gurujy täzelendi');
      return;
    }
    const createdBuilder = await createBuilder(values).unwrap();
    console.log('createdBuilder', createdBuilder);
    navigate(`/builders/${createdBuilder.id}`);
    messageApi.success('Täze gurujy goşuldy');
  };

  return (
    <AreaForm
      initialValues={getAreaAddressInitials(isNew, builder)}
      onFinish={onFinish}
      isSubmitLoading={isLoadingUpdateAddress || isLoadingCreate}
    />
  );
}
