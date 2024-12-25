import FormOrgContent from '@/components/common/FormOrgContent';
import {
  useCreateGeneralContractorMutation,
  useUpdateGeneralContractorOrgMutation,
} from '@/features/generalContractors/generalContractorsApiSlice';
import { IGeneralContractor } from '@/features/generalContractors/types';

export default function GeneralContractorOrg({
  generalContractor,
}: {
  generalContractor: IGeneralContractor;
}) {
  const [createGeneralContractor, { isLoading: isLoadingCreate }] =
    useCreateGeneralContractorMutation();

  const [updateGeneralContractorOrg, { isLoading: isLoadingUpdateOrg }] =
    useUpdateGeneralContractorOrgMutation();

  return (
    <FormOrgContent
      org={generalContractor}
      // @ts-ignore
      onCreate={createGeneralContractor}
      // @ts-ignore
      onUpdate={updateGeneralContractorOrg}
      loading={isLoadingCreate || isLoadingUpdateOrg}
    />
  );
}
