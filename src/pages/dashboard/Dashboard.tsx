import React from 'react';
import { Card, Row, Col, Typography, Spin } from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useGetDashboardStatsQuery } from '../../features/dashboard/dashboardApiSlice';
import { useTheme } from '@/contexts/ThemeContext';

const { Title } = Typography;

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884D8',
  '#82CA9D',
];

const Dashboard: React.FC = () => {
  const { data: stats, isLoading, error } = useGetDashboardStatsQuery();
  const { theme } = useTheme();

  // Use actual data or fallback to empty array
  const chartData = stats?.registries_by_user || [];

  if (error) {
    return (
      <div style={{ padding: '24px' }}>
        <Card>
          <Title level={4} style={{ color: 'red' }}>
            Error loading dashboard data
          </Title>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>Dashboard</Title>
        <p>
          Reýestr dörediliş statistikasy we ulanyjy işjeňligi gözden geçirme
        </p>
      </div>

      <Spin spinning={isLoading}>
        {stats && (
          <>
            {/* Summary Statistics */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              <Col xs={24} sm={12} md={6}>
                <Card
                  styles={{
                    body: {
                      color: theme === 'dark' ? '#ffffff' : '#000000',
                    },
                  }}
                >
                  <div
                    style={{
                      color: theme === 'dark' ? '#ffffff' : '#000000',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    <div style={{ marginBottom: '8px' }}>Jemi Reýestrler</div>
                    <div
                      style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#3f8600',
                      }}
                    >
                      {stats.total_registries}
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card
                  styles={{
                    body: {
                      color: theme === 'dark' ? '#ffffff' : '#000000',
                    },
                  }}
                >
                  <div
                    style={{
                      color: theme === 'dark' ? '#ffffff' : '#000000',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    <div style={{ marginBottom: '8px' }}>Jemi Ulanyjylar</div>
                    <div
                      style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#1890ff',
                      }}
                    >
                      {stats.total_users}
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card
                  styles={{
                    body: {
                      color: theme === 'dark' ? '#ffffff' : '#000000',
                    },
                  }}
                >
                  <div
                    style={{
                      color: theme === 'dark' ? '#ffffff' : '#000000',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    <div style={{ marginBottom: '8px' }}>Bu Aý</div>
                    <div
                      style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#722ed1',
                      }}
                    >
                      {stats.registries_this_month}
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card
                  styles={{
                    body: {
                      color: theme === 'dark' ? '#ffffff' : '#000000',
                    },
                  }}
                >
                  <div
                    style={{
                      color: theme === 'dark' ? '#ffffff' : '#000000',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    <div style={{ marginBottom: '8px' }}>Bu Ýyl</div>
                    <div
                      style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#eb2f96',
                      }}
                    >
                      {stats.registries_this_year}
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>

            {/* Charts */}
            <Row gutter={[16, 16]}>
              {/* Bar Chart - Registries by User */}
              <Col xs={24} lg={16}>
                <Card
                  title='Ulanyjy tarapyndan döredilen reýestrler'
                  style={{ height: '400px' }}
                >
                  <div
                    style={{
                      height: '300px',
                      width: '100%',
                    }}
                  >
                    <ResponsiveContainer width='100%' height='100%'>
                      <BarChart
                        data={chartData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid
                          strokeDasharray='3 3'
                          stroke={theme === 'dark' ? '#303030' : '#f0f0f0'}
                        />
                        <XAxis
                          dataKey='user_name'
                          angle={-45}
                          textAnchor='end'
                          height={80}
                          interval={0}
                          tick={{
                            fill: theme === 'dark' ? '#ffffff' : '#000000',
                          }}
                        />
                        <YAxis
                          tick={{
                            fill: theme === 'dark' ? '#ffffff' : '#000000',
                          }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor:
                              theme === 'dark' ? '#1f1f1f' : '#ffffff',
                            border:
                              theme === 'dark'
                                ? '1px solid #303030'
                                : '1px solid #d9d9d9',
                            color: theme === 'dark' ? '#ffffff' : '#000000',
                          }}
                        />
                        <Legend />
                        <Bar dataKey='count' fill='#8884d8' name='Reýestrler' />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </Col>

              {/* Pie Chart - Top Users */}
              <Col xs={24} lg={8}>
                <Card
                  title='Reýestr sany boýunça iň ýokary ulanyjylar'
                  style={{ height: '400px' }}
                >
                  <div
                    style={{
                      height: '300px',
                      width: '100%',
                    }}
                  >
                    <ResponsiveContainer width='100%' height='100%'>
                      <PieChart>
                        <Pie
                          data={chartData.slice(0, 6)}
                          cx='50%'
                          cy='50%'
                          labelLine={false}
                          label={({ payload, percent }) =>
                            `${payload?.user_name || 'Unknown'} ${(
                              (percent || 0) * 100
                            ).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill='#8884d8'
                          dataKey='count'
                        >
                          {chartData.slice(0, 6).map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor:
                              theme === 'dark' ? '#1f1f1f' : '#ffffff',
                            border:
                              theme === 'dark'
                                ? '1px solid #303030'
                                : '1px solid #d9d9d9',
                            color: theme === 'dark' ? '#ffffff' : '#000000',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </Col>
            </Row>

            {/* User Details Table */}
            <Row style={{ marginTop: '24px' }}>
              <Col span={24}>
                <Card title='Ulanyjy reýestr jikme-jiklikleri'>
                  <div style={{ overflowX: 'auto' }}>
                    <table
                      style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        color: theme === 'dark' ? '#ffffff' : '#000000',
                      }}
                    >
                      <thead>
                        <tr
                          style={{
                            borderBottom: `1px solid ${
                              theme === 'dark' ? '#303030' : '#f0f0f0'
                            }`,
                          }}
                        >
                          <th
                            style={{
                              padding: '12px',
                              textAlign: 'left',
                              fontWeight: 'bold',
                              color: theme === 'dark' ? '#ffffff' : '#000000',
                            }}
                          >
                            Ulanyjy
                          </th>
                          <th
                            style={{
                              padding: '12px',
                              textAlign: 'left',
                              fontWeight: 'bold',
                              color: theme === 'dark' ? '#ffffff' : '#000000',
                            }}
                          >
                            Email
                          </th>
                          <th
                            style={{
                              padding: '12px',
                              textAlign: 'center',
                              fontWeight: 'bold',
                              color: theme === 'dark' ? '#ffffff' : '#000000',
                            }}
                          >
                            Döredilen Reýestrler
                          </th>
                          <th
                            style={{
                              padding: '12px',
                              textAlign: 'center',
                              fontWeight: 'bold',
                              color: theme === 'dark' ? '#ffffff' : '#000000',
                            }}
                          >
                            Göterim
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {chartData.map((user) => (
                          <tr
                            key={user.user_id}
                            style={{
                              borderBottom: `1px solid ${
                                theme === 'dark' ? '#303030' : '#f0f0f0'
                              }`,
                            }}
                          >
                            <td style={{ padding: '12px' }}>
                              {user.user_name || 'Näbelli'}
                            </td>
                            <td style={{ padding: '12px' }}>
                              {user.user_email || 'N/A'}
                            </td>
                            <td
                              style={{ padding: '12px', textAlign: 'center' }}
                            >
                              {user.count}
                            </td>
                            <td
                              style={{ padding: '12px', textAlign: 'center' }}
                            >
                              {stats.total_registries > 0
                                ? `${(
                                    (user.count / stats.total_registries) *
                                    100
                                  ).toFixed(1)}%`
                                : '0%'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Spin>
    </div>
  );
};

export default Dashboard;
