// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: 'https://albertogaleano.com',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false
    },
  },
  image: {
    service: passthroughImageService(),
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@' : '/src'
      }
    }
  },

  integrations: [
    react(), 
    sitemap({
      i18n: {
        defaultLocale: 'es', 
        locales: {
          es: 'es-ES',
          en: 'en-US'
        },
      },
    }),
    robotsTxt()
  ]
});