import { Flex, Skeleton } from 'antd';
import GeneralContractorsTable from './GeneralContractorsTable';
import TableHeader from '@/components/TableHeader/TableHeader';
import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { useGetGeneralContractorsQuery } from '@/features/generalContractors/generalContractorsApiSlice';
import GeneralContractorsBreadcrumb from './GeneralContractorsBreadcrumb';

export default function GeneralContractors() {
  const { page, pageSize, search } = usePaginationSearch();

  const { data: paginatedData, isLoading: isLoadingGeneralContractors } =
    useGetGeneralContractorsQuery({
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
        <GeneralContractorsTable paginatedData={paginatedData!} />
      )}
    </Flex>
  );
}
