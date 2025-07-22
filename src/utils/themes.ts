import { ThemeConfig } from 'antd';

export const lightTheme: ThemeConfig = {
  token: {
    // Seed Token
    colorPrimary: '#2E7D32', // Bold green
    borderRadius: 4, // Slightly rounded corners
    // Alias Tokens
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBgLayout: '#f5f5f5',
    colorText: '#262626',
    colorTextSecondary: '#595959',
    colorLink: '#2E7D32',
    colorLinkHover: '#1B5E20',
    colorBorder: '#d9d9d9',
    colorBorderSecondary: '#f0f0f0',
    colorTextPlaceholder: '#bfbfbf',
  },
  components: {
    Layout: {
      headerBg: '#2E7D32', // Bold green header
      siderBg: '#2E7D32', // Bold green sidebar
      bodyBg: '#f5f5f5',
    },
    Menu: {
      darkItemBg: '#2E7D32', // Bold green background
      darkItemSelectedBg: '#1B5E20', // Darker green for selected
      darkItemHoverBg: '#388E3C', // Lighter green for hover
      darkItemColor: '#ffffff',
      darkItemSelectedColor: '#ffffff',
    },
    Typography: {
      colorText: '#262626',
      colorTextSecondary: '#595959',
      colorTextHeading: '#262626',
    },
    Button: {
      colorText: '#ffffff',
      colorBgContainer: '#2E7D32',
      colorBorder: '#2E7D32',
      colorPrimary: '#2E7D32',
      colorPrimaryHover: '#1B5E20',
      colorPrimaryActive: '#388E3C',
    },
    Input: {
      colorText: '#262626',
      colorBgContainer: '#ffffff',
      colorBorder: '#d9d9d9',
      colorTextPlaceholder: '#bfbfbf',
      colorPrimary: '#2E7D32',
      colorPrimaryHover: '#1B5E20',
      colorPrimaryActive: '#388E3C',
    },
    DatePicker: {
      colorText: '#262626',
      colorBgContainer: '#ffffff',
      colorBorder: '#d9d9d9',
      colorTextPlaceholder: '#bfbfbf',
      colorPrimary: '#2E7D32',
      colorPrimaryHover: '#1B5E20',
      colorPrimaryActive: '#388E3C',
    },
    Select: {
      colorText: '#262626',
      colorBgContainer: '#ffffff',
      colorBorder: '#d9d9d9',
      colorTextPlaceholder: '#bfbfbf',
      colorPrimary: '#2E7D32',
      colorPrimaryHover: '#1B5E20',
      colorPrimaryActive: '#388E3C',
    },
    InputNumber: {
      colorText: '#262626',
      colorBgContainer: '#ffffff',
      colorBorder: '#d9d9d9',
      colorTextPlaceholder: '#bfbfbf',
      colorPrimary: '#2E7D32',
      colorPrimaryHover: '#1B5E20',
      colorPrimaryActive: '#388E3C',
    },
    List: {
      colorText: '#262626',
      colorTextSecondary: '#595959',
      colorBgContainer: '#ffffff',
    },
  },
};

export const darkTheme: ThemeConfig = {
  token: {
    // Seed Token
    colorPrimary: '#2E7D32', // Bold green
    borderRadius: 4,
    // Alias Tokens for dark theme
    colorBgContainer: '#1f1f1f',
    colorBgElevated: '#262626',
    colorBgLayout: '#141414',
    colorText: '#ffffff',
    colorTextSecondary: '#a6a6a6',
    colorLink: '#2E7D32',
    colorLinkHover: '#388E3C',
    colorBorder: '#434343',
    colorBorderSecondary: '#303030',
    colorTextPlaceholder: '#666666',
  },
  components: {
    Layout: {
      headerBg: '#1B5E20', // Darker bold green for dark theme
      siderBg: '#1B5E20', // Darker bold green for dark theme
      bodyBg: '#141414',
    },
    Menu: {
      darkItemBg: '#1B5E20', // Darker bold green background
      darkItemSelectedBg: '#2E7D32', // Primary green for selected
      darkItemHoverBg: '#2E7D32', // Lighter green for hover
      darkItemColor: '#ffffff',
      darkItemSelectedColor: '#ffffff',
    },
    Card: {
      colorBgContainer: '#1f1f1f',
      colorBorderSecondary: '#303030',
    },
    Table: {
      colorBgContainer: '#1f1f1f',
      headerBg: '#262626',
      headerColor: '#ffffff',
    },
    Typography: {
      colorText: '#ffffff',
      colorTextSecondary: '#a6a6a6',
      colorTextHeading: '#ffffff',
    },
    Button: {
      colorText: '#ffffff',
      colorBgContainer: '#2E7D32',
      colorBorder: '#2E7D32',
      colorPrimary: '#2E7D32',
      colorPrimaryHover: '#1B5E20',
      colorPrimaryActive: '#388E3C',
    },
    Input: {
      colorText: '#ffffff',
      colorBgContainer: '#1f1f1f',
      colorBorder: '#434343',
      colorTextPlaceholder: '#666666',
      colorPrimary: '#2E7D32',
      colorPrimaryHover: '#1B5E20',
      colorPrimaryActive: '#388E3C',
    },
    DatePicker: {
      colorText: '#ffffff',
      colorBgContainer: '#1f1f1f',
      colorBorder: '#434343',
      colorTextPlaceholder: '#666666',
      colorPrimary: '#2E7D32',
      colorPrimaryHover: '#1B5E20',
      colorPrimaryActive: '#388E3C',
    },
    Select: {
      colorText: '#ffffff',
      colorBgContainer: '#1f1f1f',
      colorBorder: '#434343',
      colorTextPlaceholder: '#666666',
      colorPrimary: '#2E7D32',
      colorPrimaryHover: '#1B5E20',
      colorPrimaryActive: '#388E3C',
    },
    InputNumber: {
      colorText: '#ffffff',
      colorBgContainer: '#1f1f1f',
      colorBorder: '#434343',
      colorTextPlaceholder: '#666666',
      colorPrimary: '#2E7D32',
      colorPrimaryHover: '#1B5E20',
      colorPrimaryActive: '#388E3C',
    },
    List: {
      colorText: '#ffffff',
      colorTextSecondary: '#a6a6a6',
      colorBgContainer: '#1f1f1f',
    },
  },
};
