import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined, TableOutlined } from '@ant-design/icons';
import { Link } from 'react-router';
import { PATHS } from '../../routes/paths';

const OldRegistriesBreadcrumb: React.FC = () => {
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
            <Link to={PATHS.REGISTRIES}>
              <TableOutlined />
              <span>Reýestr</span>
            </Link>
          ),
        },
        {
          title: 'Köne Reýestr',
        },
      ]}
    />
  );
};

export default OldRegistriesBreadcrumb;
