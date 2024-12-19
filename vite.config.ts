import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // const env_production = loadEnv('production', process.cwd(), ''); // Manually specify 'production'

  return {
    server: {
      host: true,
      port: 3008,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => {
            // Exclude '/api/uploads' from being rewritten
            if (path.includes('uploads')) {
              return path; // Do not rewrite
            }
            return path.replace(/^\/api/, '');
          },
        },
      },
      cors: false,
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url)),
        },
      ],
    },
  };
});
