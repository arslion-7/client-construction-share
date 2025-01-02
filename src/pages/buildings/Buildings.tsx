import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { Flex, Skeleton } from 'antd';
import GeneralContractorsBreadcrumb from '../generalContractors/GeneralContractorsBreadcrumb';
import TableHeader from '@/components/TableHeader/TableHeader';
import { useGetBuildingsQuery } from '@/features/buildings/buildingContractorsApiSlice';
import BuildingsTable from './BuildingsTable';

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
      <GeneralContractorsBreadcrumb />
      <TableHeader />
      {isLoadingGeneralContractors ? (
        <Skeleton />
      ) : (
        <BuildingsTable paginatedData={paginatedData!} />
      )}
    </Flex>
  );
}
