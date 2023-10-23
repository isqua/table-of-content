import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'

export default function htmlFallback(): Plugin {
    return {
        name: 'html-fallback',
        configureServer({ config, middlewares }) {
            middlewares.use((req, _res, next) => {
                const { originalUrl = '' } = req

                if (originalUrl.length > 1 && path.extname(originalUrl) === '.html') {
                    if (!fs.existsSync(path.join(config.root, `${originalUrl}.html`))) {
                        req.url = '/index.html'
                    }
                }

                next()
            })
        },
    }
}
