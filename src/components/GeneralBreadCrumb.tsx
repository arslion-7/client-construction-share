import { HomeOutlined, LeftCircleFilled } from '@ant-design/icons';
import { Breadcrumb, Button, Space } from 'antd';
import { useNavigate } from 'react-router';

export default function GeneralBreadCrumb({
  items,
  withLeftArrow,
}: {
  items: Array<{ title: JSX.Element } | { href: string; title: string }>;
  withLeftArrow?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <Space>
      {withLeftArrow && (
        <Button
          shape='circle'
          icon={<LeftCircleFilled />}
          onClick={() => navigate(-1)}
        />
      )}
      <Breadcrumb
        items={[
          {
            title: <HomeOutlined />,
          },
          ...items,
        ]}
      />
    </Space>
  );
}
