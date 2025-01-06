import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { Flex, Skeleton } from 'antd';
import TableHeader from '@/components/TableHeader/TableHeader';

import { useGetBuildersQuery } from '@/features/builders/buildersApiSlice';
import BuildersBreadcrumb from './BuildersBreadcrumb';
import BuildersTable from './BuildersTable';

export default function Builders() {
  const { page, pageSize, search } = usePaginationSearch();

  const { data: paginatedData, isLoading: isLoadingGeneralContractors } =
    useGetBuildersQuery({
      page,
      pageSize,
      search
    });

  return (
    <Flex vertical gap={16}>
      <BuildersBreadcrumb />
      <TableHeader />
      {isLoadingGeneralContractors ? (
        <Skeleton />
      ) : (
        <BuildersTable paginatedData={paginatedData!} />
      )}
    </Flex>
  );
}
