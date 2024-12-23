import { Flex } from 'antd';
import NewButton from './NewButton';
import SearchInput from './SearchInput';

export default function TableHeader() {
  return (
    <Flex gap={16}>
      <NewButton />
      <SearchInput />
    </Flex>
  );
}
