import { useIsNew } from '@/utils/hooks/paramsHooks';
import { Flex } from 'antd';
import GeneralContractorsBreadcrumb from '../generalContractors/GeneralContractorsBreadcrumb';

export default function GeneralContractor() {
  const { idTk } = useIsNew();

  return (
    <Flex vertical gap={16}>
      <GeneralContractorsBreadcrumb
        withLeftArrow
        items={[{ title: idTk!, href: '' }]}
      />
      <div>GeneralContractor</div>
    </Flex>
  );
}
