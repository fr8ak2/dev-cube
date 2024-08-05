import dotenv from 'dotenv';
import { defineConfig } from 'vite';

dotenv.config();

export default defineConfig({
    base: '/dev-cube/',
    publicDir: 'resources/static',
    build: {
        assetsDir: '',
        emptyOutDir: true,
        manifest: true,
        outDir: 'assets',
        rollupOptions: {
            input: [
                'resources/js/app.js',
                'resources/scss/app.scss'
            ],
            output: {
                entryFileNames: `app.js`,
                assetFileNames: `app.css`
            },
        },
    },
    plugins: [
        {
            name: 'html',
            handleHotUpdate({ file, server }) {
                if (file.endsWith('.html')) {
                    server.ws.send({ type: 'full-reload', path: '*' });
                }
            },
        },
    ],
});