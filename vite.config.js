import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true
        }),
        vue()
    ],
    server: {
        cors: true,
        host: '0.0.0.0',
        hmr: {
            host: 'localhost',
            port: 5173,
            protocol: 'http'
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                quietDeps: true,
                silenceDeprecations: ['import']
            }
        }
    },
    define: {
        __APP_VERSION__: JSON.stringify(pkg.version)
    }
});
