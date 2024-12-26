import FormCertContent from '@/components/common/FormCertContent';
import { useUpdateGeneralContractorCertMutation } from '@/features/generalContractors/generalContractorsApiSlice';
import { IContractor } from '@/features/generalContractors/types';
import { ICert } from '@/features/generalTypes';
import { useIsNew } from '@/utils/hooks/paramsHooks';

export default function GeneralContractorCert({
  generalContractor,
}: {
  generalContractor: IContractor;
}) {
  const { isNew, id } = useIsNew();

  const [updateGeneralContractorCert, { isLoading: isLoadingUpdateCert }] =
    useUpdateGeneralContractorCertMutation();

  const onFinish = async (values: ICert) => {
    if (!isNew) {
      await updateGeneralContractorCert({ id: id!, cert: values });
      return;
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
