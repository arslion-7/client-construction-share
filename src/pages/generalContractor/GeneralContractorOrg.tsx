import FormOrgContent from '@/components/common/FormOrgContent';
import {
  useCreateGeneralContractorMutation,
  useUpdateGeneralContractorOrgMutation,
} from '@/features/generalContractors/generalContractorsApiSlice';
import { IContractor } from '@/features/generalContractors/types';
import { IOrg } from '@/features/generalTypes';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useNavigate } from 'react-router';

export default function GeneralContractorOrg({
  generalContractor,
}: {
  generalContractor: IContractor;
}) {
  const { isNew, id } = useIsNew();
  const navigate = useNavigate();
  const [createGeneralContractor, { isLoading: isLoadingCreate }] =
    useCreateGeneralContractorMutation();

  const [updateGeneralContractorOrg, { isLoading: isLoadingUpdateOrg }] =
    useUpdateGeneralContractorOrgMutation();

  const onFinish = async (values: IOrg) => {
    if (!isNew) {
      await updateGeneralContractorOrg({ id: id!, org: values });
      return;
    }
    const generalContractor = await createGeneralContractor(values).unwrap();
    navigate(`/general_contractors/${generalContractor.id}`);
  };

  return (
    <FormOrgContent
      org={generalContractor}
      onFinish={onFinish}
      loading={isLoadingCreate || isLoadingUpdateOrg}
    />
  );
}
