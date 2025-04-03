import { type TableProps } from 'antd';
import { useNavigate } from 'react-router';
import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { useSelectBuildingMutation } from '@/features/registries/registriesApiSlice';
import { useMessageApi } from '@/utils/messages';
import { IBuilding } from '@/features/buildings/types';
import { useEditColumns, useSufColumns } from '@/components/table/columns';

export function useColumns() {
  const navigate = useNavigate();
  const { registryId } = usePaginationSearch();
  const { messageApi } = useMessageApi();

  const [select, { isLoading: isLoadingSelect }] = useSelectBuildingMutation();

  const onSelectClicked = async (id: number) => {
    await select({
      id: registryId.toString(),
      building_id: id,
    });
    messageApi.success('Desga saýlandy');
    navigate(`/registries/${registryId}?tab=choices`);
  };

  const { sufColumns } = useSufColumns({
    isLoadingSelect,
    onSelectClicked,
    registryId,
    selectedId: 'building_id',
  });

  const { editColumns } = useEditColumns();

  const preColumns: TableProps<IBuilding>['columns'] = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 't_b',
      dataIndex: 't_b',
      key: 't_b',
    },
    {
      title: 'ident_number',
      dataIndex: 'ident_number',
      key: 'ident_number',
    },
    {
      title: 'area_full_name',
      dataIndex: 'area_full_name',
      key: 'area_full_name',
    },
    {
      title: 'Street',
      dataIndex: 'street',
      key: 'street',
    },
    {
      title: 'Karar',
      dataIndex: 'order_code',
      key: 'order_code',
    },
  ];

  return [...preColumns, ...editColumns, ...sufColumns];
}
