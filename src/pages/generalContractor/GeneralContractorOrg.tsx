import FormOrgContent from '@/components/common/FormOrgContent';
import {
  useCreateGeneralContractorMutation,
  useUpdateGeneralContractorOrgMutation,
} from '@/features/generalContractors/generalContractorsApiSlice';
import { IContractor } from '@/features/generalContractors/types';
import { IOrg } from '@/features/generalTypes';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { useNavigate } from 'react-router';

export default function GeneralContractorOrg({
  generalContractor,
}: {
  generalContractor: IContractor;
}) {
  const { isNew, id } = useIsNew();
  const navigate = useNavigate();
  const { messageApi } = useMessageApi();

  const [createGeneralContractor, { isLoading: isLoadingCreate }] =
    useCreateGeneralContractorMutation();

  const [updateGeneralContractorOrg, { isLoading: isLoadingUpdateOrg }] =
    useUpdateGeneralContractorOrgMutation();

  const onFinish = async (values: IOrg) => {
    if (!isNew) {
      await updateGeneralContractorOrg({ id: id!, org: values });
      messageApi.success('Baş potratçy täzelendi');
      return;
    }
    const generalContractor = await createGeneralContractor(values).unwrap();
    navigate(`/general_contractors/${generalContractor.id}`);
    messageApi.success('Täze baş potratçy goşuldy');
  };

  return (
    <FormOrgContent
      org={generalContractor}
      onFinish={onFinish}
      loading={isLoadingCreate || isLoadingUpdateOrg}
    />
  );
}
