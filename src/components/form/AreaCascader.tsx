import { Cascader, Skeleton } from 'antd';

import { useGetAreaHierarchyQuery } from '@/features/areas/areasApiSlice';
import { CascaderOption } from '@/utils/responseUtils';

import type { CascaderProps, GetProp } from 'antd';

type DefaultOptionType = GetProp<CascaderProps, 'options'>[number];

export default function AreaCascader(props) {
  const { data: areas, isLoading: isLoadingAreas } = useGetAreaHierarchyQuery();

  if (isLoadingAreas) return <Skeleton />;

  const onChange: CascaderProps<CascaderOption>['onChange'] = (value) => {
    console.log(value);
  };

  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1
    );

  return (
    <Cascader
      {...props}
      loading={isLoadingAreas}
      style={{ width: 500 }}
      options={areas?.options}
      onChange={onChange}
      showSearch={{ filter }}
      placeholder='Yeri sayla'
      onSearch={(value) => console.log(value)}
    />
  );
}
