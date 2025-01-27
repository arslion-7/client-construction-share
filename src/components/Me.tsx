import { useGetMeQuery } from '@/features/auth/authApiSlice';
import { PATHS } from '@/routes/paths';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Popover, Spin } from 'antd';
import { useNavigate } from 'react-router';

function Me() {
  const { data: me, isLoading: isMeLoading } = useGetMeQuery(null);

  const navigate = useNavigate();

  console.log('me', me);

  const content = (
    <div>
      <p>{me?.full_name}</p>
      <p>{me?.phone_number}</p>
      <Button icon={<LogoutOutlined />} onClick={() => navigate(PATHS.SIGNIN)}>
        Ulgamdan çyk
      </Button>
    </div>
  );

  return isMeLoading ? (
    <Spin />
  ) : (
    <Popover content={content} title='Men barada maglumat'>
      <Button icon={<UserOutlined />}>{me?.email}</Button>
    </Popover>
  );
}

export default Me;
