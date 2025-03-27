import { IBuilder } from '@/features/builders/types';
import { useUpdateBuilderAddressMutation } from '@/features/builders/buildersApiSlice';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { getAreaAddressInitials } from '@/utils/convertors';
import AreaForm, { IAreaAddressForm } from '@/components/form/AreaAddressForm';

interface IProps {
  builder: IBuilder;
}

export default function BuilderAddress({ builder }: IProps) {
  const { id, isNew } = useIsNew();
  const { messageApi } = useMessageApi();

  const [updateAddress, { isLoading: isLoadingUpdateAddress }] =
    useUpdateBuilderAddressMutation();

  const onFinish = async (values: IAreaAddressForm) => {
    if (!isNew) {
      await updateAddress({
        id: id!,
        ...values,
      });
      messageApi.success('Gurujyň adresi täzelendi');
      return;
    }
  };

  return (
    <AreaForm
      initialValues={getAreaAddressInitials(isNew, builder)}
      onFinish={onFinish}
      isSubmitLoading={isLoadingUpdateAddress}
    />
  );
}
