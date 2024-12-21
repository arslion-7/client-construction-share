import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

export default function GeneralBreadCrumb({
  items
}: {
  items: Array<{ title: JSX.Element } | { href: string; title: string }>;
}) {
  return (
    <Breadcrumb
      items={[
        {
          title: <HomeOutlined />
        },
        ...items
      ]}
    />
  );
}
