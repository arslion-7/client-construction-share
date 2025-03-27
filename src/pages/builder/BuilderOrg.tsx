import FormOrgContent from '@/components/common/FormOrgContent';
import {
  useCreateBuilderMutation,
  useUpdateBuilderOrgMutation,
} from '@/features/builders/buildersApiSlice';
import { IBuilder } from '@/features/builders/types';
import { IOrg } from '@/features/generalTypes';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { useNavigate } from 'react-router';

export default function BuilderOrg({ builder }: { builder: IBuilder }) {
  const { isNew, id } = useIsNew();
  const navigate = useNavigate();
  const { messageApi } = useMessageApi();

  const [createBuilder, { isLoading: isLoadingCreate }] =
    useCreateBuilderMutation();

  const [updateBuilderOrg, { isLoading: isLoadingUpdateOrg }] =
    useUpdateBuilderOrgMutation();

  const onFinish = async (values: IOrg) => {
    if (!isNew) {
      await updateBuilderOrg({ id: id!, org: values });
      messageApi.success('Gurujy täzelendi');
      return;
    }
    const builder = await createBuilder(values).unwrap();
    navigate(`/builders/${builder.id}`);
    messageApi.success('Täze gurujy goşuldy');
  };

  return (
    <FormOrgContent
      org={builder}
      onFinish={onFinish}
      loading={isLoadingCreate || isLoadingUpdateOrg}
    />
  );
}
