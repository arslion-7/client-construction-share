import FormOrgContent from '@/components/common/FormOrgContent';
import {
  useCreateShareholderMutation,
  useUpdateShareholderOrgMutation,
} from '@/features/shareholders/shareholdersApiSlice';
import { IShareholder } from '@/features/shareholders/types';
import { IOrg } from '@/features/generalTypes';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { useNavigate } from 'react-router';

export default function ShareholderOrg({
  shareholder,
}: {
  shareholder: IShareholder;
}) {
  const { isNew, id } = useIsNew();
  const navigate = useNavigate();
  const { messageApi } = useMessageApi();

  const [createShareholder, { isLoading: isLoadingCreate }] =
    useCreateShareholderMutation();

  const [updateShareholderOrg, { isLoading: isLoadingUpdateOrg }] =
    useUpdateShareholderOrgMutation();

  const onFinish = async (values: IOrg) => {
    if (!isNew) {
      await updateShareholderOrg({ id: id!, org: values });
      messageApi.success('Baş potratçy täzelendi');
      return;
    }
    const shareholder = await createShareholder(values).unwrap();
    navigate(`/general_contractors/${shareholder.id}`);
    messageApi.success('Täze baş potratçy goşuldy');
  };

  return (
    <FormOrgContent
      org={shareholder}
      onFinish={onFinish}
      loading={isLoadingCreate || isLoadingUpdateOrg}
    />
  );
}
