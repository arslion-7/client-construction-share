import { Flex } from 'antd';
import AddButton from './AddButton';
import SearchInput from './SearchInput';

export default function TableHeader() {
  return (
    <Flex gap={16}>
      <AddButton />
      <SearchInput />
    </Flex>
  );
}
