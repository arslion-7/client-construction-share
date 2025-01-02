import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { Flex, Skeleton } from 'antd';
import TableHeader from '@/components/TableHeader/TableHeader';

import BuildingsTable from './BuildingsTable';
import BuildingsBreadcrumb from './BuildingsBreadcrumb';
import { useGetBuildingsQuery } from '@/features/buildings/buildingsApiSlice';

export default function Buildings() {
  const { page, pageSize, search } = usePaginationSearch();

  const { data: paginatedData, isLoading: isLoadingGeneralContractors } =
    useGetBuildingsQuery({
      page,
      pageSize,
      search,
    });

  return (
    <Flex vertical gap={16}>
      <BuildingsBreadcrumb />
      <TableHeader />
      {isLoadingGeneralContractors ? (
        <Skeleton />
      ) : (
        <BuildingsTable paginatedData={paginatedData!} />
      )}
    </Flex>
  );
}
