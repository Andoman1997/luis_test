export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  css: [
    '~/assets/scss/main.scss',
    '~/styles/components/slider.scss',
    '~/styles/components/modal.scss',
    '~/styles/components/widget.scss',
    '~/styles/components/grid.scss',
  ],
  typescript: {
    strict: true,
    typeCheck: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/variables" as *;',
        },
      },
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
  experimental: {
    payloadExtraction: false,
  },
})
