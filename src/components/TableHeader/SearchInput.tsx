import { Input } from 'antd';
import type { GetProps } from 'antd';
import { useSearchParams } from 'react-router';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

export default function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();

  const onSearch: SearchProps['onSearch'] = (value) => {
    searchParams.set('search', value);
    searchParams.delete('page');
    searchParams.delete('pageSize');
    setSearchParams(searchParams);
    // console.log(info?.source, value);
  };

  return (
    <Search
      placeholder='Gözle (order, cert, kind, street, price, etc.)'
      allowClear
      // enterButton='Search'
      onSearch={onSearch}
    />
  );
}
