import React from 'react';
import RegistriesTable from './RegistriesTable';
import { Alert, Flex, Skeleton } from 'antd';
import TableHeader from '@/components/TableHeader/TableHeader';
import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import RegistriesBreadcrumb from './RegistriesBreadcrumb';
import { useGetRegistriesQuery } from '@/features/registries/registriesApiSlice';

const Registries: React.FC = () => {
  const { page, pageSize, search } = usePaginationSearch();

  const { data: paginatedData, isLoading: isLoadingGeneralContractors } =
    useGetRegistriesQuery({
      page,
      pageSize,
      search,
    });

  return (
    <Flex vertical gap={16}>
      <RegistriesBreadcrumb />
      <TableHeader />
      <Alert
        message="Reňkli setirler - Ret edilen ýazgylar (çep tarapynda gyzyl çyzyk)"
        type="info"
        showIcon
        closable
      />
      {isLoadingGeneralContractors ? (
        <Skeleton />
      ) : (
        <RegistriesTable paginatedData={paginatedData!} />
      )}
    </Flex>
  );
};

export default Registries;
