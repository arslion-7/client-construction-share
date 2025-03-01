import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { Flex, Skeleton } from 'antd';
import TableHeader from '@/components/TableHeader/TableHeader';

import ReceiversTable from './ReceiversTable';
import { useGetReceiversQuery } from '@/features/receivers/receiversApiSlice';
import ReceiversBreadcrumb from './BuildingsBreadcrumb';

export default function Receivers() {
  const { page, pageSize, search } = usePaginationSearch();

  const { data: paginatedData, isLoading: isLoadingGeneralContractors } =
    useGetReceiversQuery({
      page,
      pageSize,
      search
    });

  return (
    <Flex vertical gap={16}>
      <ReceiversBreadcrumb />
      <TableHeader />
      {isLoadingGeneralContractors ? (
        <Skeleton />
      ) : (
        <ReceiversTable paginatedData={paginatedData!} />
      )}
    </Flex>
  );
}
