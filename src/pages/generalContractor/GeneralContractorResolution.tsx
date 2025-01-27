import FormResolutionContent from '@/components/common/FormResolutionContent';
import { useUpdateGeneralContractorResolutionMutation } from '@/features/generalContractors/generalContractorsApiSlice';
import { IContractor } from '@/features/generalContractors/types';
import { IResolution } from '@/features/generalTypes';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';

export default function GeneralContractorResolution({
  generalContractor,
}: {
  generalContractor: IContractor;
}) {
  const { isNew, id } = useIsNew();
  const { messageApi } = useMessageApi();

  const [
    updateGeneralContractorResolution,
    { isLoading: isLoadingUpdateResolution },
  ] = useUpdateGeneralContractorResolutionMutation();

  const onFinish = async (values: IResolution) => {
    if (!isNew) {
      try {
        await updateGeneralContractorResolution({
          id: id!,
          resolution: values,
        });
        messageApi.success('Ygtyýarnama maglumaty täzelendi');
      } catch (error) {
        console.log('error', error);
      }
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
