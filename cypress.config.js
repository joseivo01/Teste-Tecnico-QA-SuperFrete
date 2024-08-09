const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
  setupNodeEvents(on, config) {
    // implementar node event listeners aqui, caso houver, como config do .-.
  },
    browser: 'chrome',
    downloadsFolder: 'cypress/downloads',
    defaultCommandTimeout: 15000,
    baseUrl: 'https://web.superfrete.com/',
    supportFile:'cypress/support/index.js',
    retries: {
      runMode: 3,  // Número de tentativas ao rodar `cypress run`
      openMode: 3, // Número de tentativas ao rodar `cypress open`
    },
    chromeWebSecurity: false
  },
  viewportWidth: 1366,
  viewportHeight: 768,
});
