import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { Flex, Skeleton } from 'antd';
import TableHeader from '@/components/TableHeader/TableHeader';

import { useGetShareholdersQuery } from '@/features/shareholders/shareholdersApiSlice';
import ShareholdersBreadcrumb from './ShareholdersBreadcrumb';
import ShareholdersTable from './ShareholdersTable';

export default function Shareholders() {
  const { page, pageSize, search } = usePaginationSearch();

  const { data: paginatedData, isLoading: isLoadingGeneralContractors } =
    useGetShareholdersQuery({
      page,
      pageSize,
      search
    });

  return (
    <Flex vertical gap={16}>
      <ShareholdersBreadcrumb />
      <TableHeader />
      {isLoadingGeneralContractors ? (
        <Skeleton />
      ) : (
        <ShareholdersTable paginatedData={paginatedData!} />
      )}
    </Flex>
  );
}
