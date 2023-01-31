import { defineConfig } from 'cypress'

export default defineConfig({
  viewportHeight: 800,
  viewportWidth: 400,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
})
