import { existsSync, mkdirSync, readdirSync, renameSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig, normalizePath } from 'vite'

const pagePath = (name) => normalizePath(`${process.cwd()}/src/pages/${name}`)

const pagesDirectory = join(process.cwd(), 'src/pages')

function findHtmlPages(directory, prefix = '') {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name

    if (entry.isDirectory()) {
      return findHtmlPages(join(directory, entry.name), relativePath)
    }

    return entry.name.endsWith('.html') ? [relativePath] : []
  })
}

const pageNames = findHtmlPages(pagesDirectory).sort()

const pageInputs = Object.fromEntries(
  pageNames.map((name) => [name.replace(/[/.]/g, '-'), pagePath(name)]),
)

function servePagesFromSrc() {
  return {
    name: 'serve-pages-from-src',
    configureServer(server) {
      server.middlewares.use((request, _response, next) => {
        const [pathname, query] = (request.url || '/').split('?')
        const requestedPage = pathname === '/' ? 'index.html' : pathname.slice(1)
        const page = pageNames.includes(requestedPage)
          ? requestedPage
          : `others/${requestedPage}`

        if (pageNames.includes(page)) {
          request.url = `/src/pages/${page}${query ? `?${query}` : ''}`
        }

        next()
      })
    },
    handleHotUpdate({ file, server }) {
      if (/[/\\]src[/\\]pages[/\\].+\.html$/.test(file)) {
        server.ws.send({ type: 'full-reload', path: '*' })
        return []
      }
    },
  }
}

function flattenPageOutputs() {
  return {
    name: 'flatten-page-outputs',
    writeBundle(options) {
      const outputDir = options.dir

      for (const pageName of pageNames) {
        const nestedPath = join(outputDir, 'src', 'pages', pageName)
        const rootPath = pageName === 'index.html'
          ? join(outputDir, pageName)
          : join(outputDir, pageName.replace(/^others\//, ''))

        if (!existsSync(nestedPath)) {
          continue
        }

        mkdirSync(outputDir, { recursive: true })
        rmSync(rootPath, { force: true })
        renameSync(nestedPath, rootPath)
      }

      rmSync(join(outputDir, 'src'), { recursive: true, force: true })
    },
  }
}

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('apex-') || tag.startsWith('contex-'),
        },
      },
    }),
    servePagesFromSrc(),
    flattenPageOutputs(),
  ],
  build: {
    rollupOptions: {
      input: {
        ...pageInputs,
      },
    },
  },
  server: {
    middlewareMode: false,
    host: true,
    allowedHosts: ['contex-spa.local', 'localhost'],
    port: 3838,
    strictPort: true,
    hmr: {
      host: 'contex-spa.local',
      protocol: 'wss',
      clientPort: 443,
      path: '/__vite_hmr',
      timeout: 60000,
    },
    watch: {
      usePolling: true,
      interval: 250,
    },
    fs: {
      allow: ['.'],
    },
  },
  preview: {
    host: 'contex-spa.localhost',
    port: 4838,
    strictPort: true,
  },
})
