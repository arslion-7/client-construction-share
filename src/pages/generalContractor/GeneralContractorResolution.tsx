import FormResolutionContent from '@/components/common/FormResolutionContent';
import { useUpdateGeneralContractorResolutionMutation } from '@/features/generalContractors/generalContractorsApiSlice';
import { IContractor } from '@/features/generalContractors/types';
import { IResolution } from '@/features/generalTypes';
import { useIsNew } from '@/utils/hooks/paramsHooks';

export default function GeneralContractorResolution({
  generalContractor,
}: {
  generalContractor: IContractor;
}) {
  const { isNew, id } = useIsNew();

  const [
    updateGeneralContractorResolution,
    { isLoading: isLoadingUpdateResolution },
  ] = useUpdateGeneralContractorResolutionMutation();

  const onFinish = async (values: IResolution) => {
    if (!isNew) {
      await updateGeneralContractorResolution({ id: id!, resolution: values });
      return;
    }
  };

  return (
    <FormResolutionContent
      resolution={{
        resolution_code: generalContractor.resolution_code,
        resolution_begin_date: generalContractor.resolution_begin_date,
        resolution_end_date: generalContractor.resolution_end_date,
      }}
      onFinish={onFinish}
      loading={isLoadingUpdateResolution}
    />
  );
}
