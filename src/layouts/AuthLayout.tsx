import { Card, Flex, Typography } from 'antd';
import { Outlet } from 'react-router';
import img from '@/assets/construction-share-big.webp';

export default function AuthLayout() {
  return (
    <Card hoverable style={{ width: 620 }} className='centered'>
      <Flex justify='space-between'>
        <img alt='avatar' src={img} style={{ display: 'block', width: 273 }} />
        <Flex
          vertical
          align='center'
          justify='space-between'
          style={{ padding: 32 }}
        >
          <Typography.Title level={3}>Paýly - R</Typography.Title>
          <Outlet />
        </Flex>
      </Flex>
    </Card>
  );
}
