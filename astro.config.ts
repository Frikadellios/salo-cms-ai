import { URL, fileURLToPath } from 'node:url'
import cloudflare from '@astrojs/cloudflare'
import mdx from '@astrojs/mdx'
import partytown from '@astrojs/partytown'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'astro/config'

import postCssOklabPolyfill from '@csstools/postcss-oklab-function'
import tailwindcss from '@tailwindcss/vite'
import autoprefixer from 'autoprefixer'
import cssDiscardComments from 'postcss-discard-comments'
import lightningcss from 'vite-plugin-lightningcss'

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  site: 'https://salo-ai.pages.dev',
  vite: {
    build: {
      minify: true,
      cssMinify: 'lightningcss',
      chunkSizeWarningLimit: 3000 // Increase the limit to 3000 kB
    },
    css: {
      postcss: {
        plugins: [postCssOklabPolyfill({ preserve: true }), autoprefixer(), cssDiscardComments({ removeAll: true })]
      }
    },
    plugins: [
      lightningcss({
        browserslist: ['>= 0.25%', 'last 2 versions', 'maintained node versions', 'Firefox ESR', 'not dead'] // Correctly set browser queries
      }),
      tailwindcss(),
      legacy({
        targets: ['>= 0.25%', 'last 2 versions', 'maintained node versions', 'Firefox ESR', 'not dead']
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./src', import.meta.url)),
        '~~': fileURLToPath(new URL('./', import.meta.url))
      }
    }
  },
  output: 'hybrid',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  prefetch: {
    prefetchAll: true
  },
  integrations: [react(), sitemap(), partytown(), mdx(), vue()]
})
