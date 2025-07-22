import { Layout } from 'antd';
import { useRef } from 'react';
import Me from './Me';
import ThemeSwitcher from './ThemeSwitcher';
import ThemeTour from './ThemeTour';

const { Header } = Layout;

export default function AppHeader() {
  const themeSwitcherRef = useRef<HTMLButtonElement>(null);

  return (
    <>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ThemeSwitcher ref={themeSwitcherRef} />
          <Me />
        </div>
      </Header>
      <ThemeTour themeSwitcherRef={themeSwitcherRef} />
    </>
  );
}
