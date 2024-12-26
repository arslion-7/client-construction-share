import { useIdAddedBreadCrumb } from '@/utils/hooks/paramsHooks';
import { HomeOutlined, LeftCircleFilled } from '@ant-design/icons';
import { Breadcrumb, Button, Space } from 'antd';
import { useNavigate } from 'react-router';

export default function GeneralBreadCrumb({
  items,
  withLeftArrow,
  withId,
}: {
  items: Array<{ title: JSX.Element } | { href: string; title: string }>;
  withLeftArrow?: boolean;
  withId?: boolean;
}) {
  const navigate = useNavigate();

  const idItems = useIdAddedBreadCrumb({ withId });

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
          ...idItems,
        ]}
      />
    </Space>
  );
}
