const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    
    watchForFileChanges: false,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        // Ignore fetch errors
        ignoreFetchError: () => null,
      });
    },
    baseUrl: 'https://dev.dashboard.addispay.et',
    
  }
});
