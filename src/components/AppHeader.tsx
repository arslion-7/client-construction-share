import { Layout } from 'antd';
import Me from './Me';

const { Header } = Layout;

export default function AppHeader() {
  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      // style={{ padding: 0, textAlign: 'center' }}
    >
      {/* Paýly gurluşyk işini utgaşdyrýan bölümi */}
      Paýly-R
      <Me />
    </Header>
  );
}
