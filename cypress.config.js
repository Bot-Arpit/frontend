const { defineConfig } = require('cypress');

module.exports = {
  e2e: {
    baseUrl: "https://practicetestautomation.com/",
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'Front End',
      embeddedScreenshots: false,
      inlineAssets: false,
      json: false
    },
    env: {
      path: "practice-test-login/",
      username: "student",
      password: "Password123"
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },

  },
};
