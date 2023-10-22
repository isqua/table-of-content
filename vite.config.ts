/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svgr(),
        react(),
    ],
    // https://vitest.dev/config/
    test: {
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
        css: {
            modules: {
                classNameStrategy: 'stable',
            },
        },
    },
})
