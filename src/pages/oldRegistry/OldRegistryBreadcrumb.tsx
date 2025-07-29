import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined, TableOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router';
import { PATHS } from '../../routes/paths';

const OldRegistryBreadcrumb: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Breadcrumb
      items={[
        {
          title: (
            <Link to='/'>
              <HomeOutlined />
            </Link>
          ),
        },
        {
          title: (
            <Link to={PATHS.OLD_REGISTRIES}>
              <TableOutlined />
              <span>Köne Reýestr</span>
            </Link>
          ),
        },
        {
          title: `T/B: ${id}`,
        },
      ]}
    />
  );
};

export default OldRegistryBreadcrumb;
