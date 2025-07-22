import { Button, Tooltip } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { useTheme } from '@/contexts/ThemeContext';
import { forwardRef } from 'react';

const ThemeSwitcher = forwardRef<HTMLButtonElement>((_, ref) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tooltip title={theme === 'light' ? 'Garaňky tema' : 'Ýagty tema'}>
      <Button
        ref={ref}
        type='text'
        icon={theme === 'light' ? <BulbOutlined /> : <BulbFilled />}
        onClick={toggleTheme}
        style={{
          color: '#ffffff',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
        }}
        className='theme-switcher-btn'
      />
    </Tooltip>
  );
});

ThemeSwitcher.displayName = 'ThemeSwitcher';

export default ThemeSwitcher;
