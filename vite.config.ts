/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

import htmlFallback from './vite/history'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    appType: 'spa',
    plugins: [
        svgr(),
        react(),
        htmlFallback()
    ],
    resolve: {
        alias: mode === 'production' ? {
            'react-dom/client': 'react-dom/profiling'
        } : undefined,
    },
    // https://vitest.dev/config/
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
        css: {
            modules: {
                classNameStrategy: 'stable',
            },
        },
    },
}))
