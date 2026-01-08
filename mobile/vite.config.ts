import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@core': path.resolve(__dirname, '../core'),
            '@utils': path.resolve(__dirname, '../utils'),
            '@types': path.resolve(__dirname, '../types'),
        },
    },
});
