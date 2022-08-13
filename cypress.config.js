const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://qa.eshrewd.net/admin/auth/login",
    specPattern: ["**/*.{feature,features}"],
    viewportHeight: 1080,
    viewportWidth: 1920,
    videoCompression:1,
    env: {
      email: "Diego",
      password: "test",
      username: "Diego Duarte",
      landing_page: "global-admin/contracts",
      timeZone: "Asia/Colombo",
      TAGS: "@stage and not @ignore"
    },

    projectId: "i24984"
  },
});
