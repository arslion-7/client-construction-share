import { IShareholder } from '@/features/shareholders/types';
import {
  useCreateShareholderMutation,
  useUpdateShareholderAddressMutation,
} from '@/features/shareholders/shareholdersApiSlice';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useNavigate } from 'react-router';
import { useMessageApi } from '@/utils/messages';
import { getAreaAddressInitials } from '@/utils/convertors';
import AreaForm, { IAreaAddressForm } from '@/components/form/AreaAddressForm';

interface IProps {
  shareholder: IShareholder;
}

export default function ShareholderAddress({ shareholder }: IProps) {
  const { id, isNew } = useIsNew();
  const navigate = useNavigate();
  const { messageApi } = useMessageApi();

  const [createShareholder, { isLoading: isLoadingCreate }] =
    useCreateShareholderMutation();

  const [updateAddress, { isLoading: isLoadingUpdateAddress }] =
    useUpdateShareholderAddressMutation();

  const onFinish = async (values: IAreaAddressForm) => {
    if (!isNew) {
      await updateAddress({
        id: id!,
        ...values,
      });
      messageApi.success('Paýçyň adresi täzelendi');
      return;
    }
    const createdShareholder = await createShareholder(values).unwrap();
    console.log('createdShareholder', createdShareholder);
    navigate(`/shareholders/${createdShareholder.id}`);
    messageApi.success('Täze paýçy goşuldy');
  };

  return (
    <AreaForm
      initialValues={getAreaAddressInitials(isNew, shareholder)}
      onFinish={onFinish}
      isSubmitLoading={isLoadingUpdateAddress || isLoadingCreate}
    />
  );
}
