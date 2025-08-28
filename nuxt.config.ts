// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui-pro'],
  css: ['~/assets/css/main.css'],
  uiPro: {
    license: 'dev',
    mdc: true,
    content: true
  },
  ui: {
    theme: {
      colors: ['primary', 'success', 'warning', 'error'],
      defaultVariants: {
        color: 'primary',
        size: 'md'
      },
      transitions: true
    }
  },
  routeRules: {
    '/course/**': { prerender: false }
  }
})
