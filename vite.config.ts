/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
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
