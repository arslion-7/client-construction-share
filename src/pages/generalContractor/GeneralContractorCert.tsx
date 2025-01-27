import FormCertContent from '@/components/common/FormCertContent';
import { useUpdateGeneralContractorCertMutation } from '@/features/generalContractors/generalContractorsApiSlice';
import { IContractor } from '@/features/generalContractors/types';
import { ICert } from '@/features/generalTypes';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';

export default function GeneralContractorCert({
  generalContractor,
}: {
  generalContractor: IContractor;
}) {
  const { isNew, id } = useIsNew();

  const { messageApi } = useMessageApi();

  const [updateGeneralContractorCert, { isLoading: isLoadingUpdateCert }] =
    useUpdateGeneralContractorCertMutation();

  const onFinish = async (values: ICert) => {
    if (!isNew) {
      try {
        await updateGeneralContractorCert({ id: id!, cert: values });
        messageApi.success('Ygtyýarnama maglumaty täzelendi');
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  return (
    <FormCertContent
      cert={{
        cert_number: generalContractor.cert_number,
        cert_date: generalContractor.cert_date,
      }}
      onFinish={onFinish}
      loading={isLoadingUpdateCert}
    />
  );
}
