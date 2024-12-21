import { Input } from 'antd';
import type { GetProps } from 'antd';
import { useSearchParams } from 'react-router';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

export default function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();

  const onSearch: SearchProps['onSearch'] = (value, _, __) => {
    searchParams.set('search', value);
    setSearchParams(searchParams);
    // console.log(info?.source, value);
  };

  return (
    <Search
      placeholder='Gözle'
      allowClear
      // enterButton='Search'
      onSearch={onSearch}
    />
  );
}
