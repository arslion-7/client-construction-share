import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { Table } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { useSearchParams } from 'react-router';
import { PaginatedResponse } from '@/utils/responseUtils';
import { useColumns, IRegistryColumnFilters } from './hooks';
import { IRegistry } from '@/features/registries/types';
import { useGetRegistryFilterOptionsQuery } from '@/features/registries/registriesApiSlice';

// antd column key -> URL/backend query param
const FILTER_PARAM_BY_COLUMN: Record<string, keyof IRegistryColumnFilters> = {
  t_b: 't_b',
  general_contractor: 'gc_ids',
  user: 'user_ids',
  shareholder_description: 'shareholder_q',
  building_description: 'building_q',
  builder_description: 'builder_q',
};

export function useRegistryColumnFilters(): IRegistryColumnFilters {
  const [searchParams] = useSearchParams();
  const list = (name: string) =>
    (searchParams.get(name) || '').split(',').filter(Boolean);
  return {
    t_b: searchParams.get('t_b') || '',
    gc_ids: list('gc_ids'),
    user_ids: list('user_ids'),
    shareholder_q: searchParams.get('shareholder_q') || '',
    builder_q: searchParams.get('builder_q') || '',
    building_q: searchParams.get('building_q') || '',
  };
}

export default function RegistriesTable({
  paginatedData,
}: {
  paginatedData: PaginatedResponse<IRegistry[]>;
}) {
  const { onChangePagination, getPagination } = usePaginationSearch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: filterOptions } = useGetRegistryFilterOptionsQuery();
  const filterValues = useRegistryColumnFilters();

  const { columns, expandedRows, setExpandedRows } = useColumns({
    filterOptions,
    filterValues,
  });

  const onChange: TableProps<IRegistry>['onChange'] = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>
  ) => {
    let filtersChanged = false;
    Object.entries(FILTER_PARAM_BY_COLUMN).forEach(([columnKey, param]) => {
      const value = filters[columnKey];
      const next = value && value.length ? value.join(',') : '';
      const current = searchParams.get(param) || '';
      if (next !== current) {
        filtersChanged = true;
        if (next) {
          searchParams.set(param, next);
        } else {
          searchParams.delete(param);
        }
      }
    });
    if (filtersChanged) {
      // filter change resets to the first page
      searchParams.set('page', '1');
      if (pagination.pageSize) {
        searchParams.set('pageSize', pagination.pageSize.toString());
      }
      setSearchParams(searchParams);
    } else {
      onChangePagination(pagination);
    }
  };

  return (
    <Table
      rowKey='id'
      columns={columns}
      dataSource={paginatedData?.data}
      pagination={getPagination<IRegistry[]>(paginatedData!)}
      onChange={onChange}
      scroll={{ x: 'max-content' }}
      rowClassName={(record) => {
        // Highlight rows with denial information
        if (
          record.denial_reason ||
          record.denial_date ||
          record.denial_additional_info
        ) {
          return 'denial-row';
        }
        // Rows migrated from the old registries
        if (record.old_registry_id) {
          return 'old-registry-row';
        }
        return '';
      }}
      onRow={(record) => ({
        onClick: () => {
          // Toggle expand state for this specific row
          const newExpandedRows = { ...expandedRows };
          newExpandedRows[record.id] = !newExpandedRows[record.id];
          setExpandedRows(newExpandedRows);
        },
        style: { cursor: 'pointer' },
      })}
    />
  );
}
