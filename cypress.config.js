const { defineConfig } = require("cypress");
const ExcelJS = require('exceljs');

module.exports = defineConfig({
  e2e: {
    projectId: 'seod27',
    baseUrl: 'https://www.amazon.in',
    reporter: 'cypress-mochawesome-reporter', // for html reports
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on) // for html reports
      // implement node event listeners here
      on('task', {
        customTask() {
          console.log('my custom task')
          return 'OK';
        },
        async readExcel({ filePath }) {
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.readFile(filePath);
          const sheet = workbook.worksheets[0];  // Get the first sheet
          const data = [];

          sheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
            // Push each row as an object
            if (rowNumber > 1) {
              data.push({
                username: row.values.at(1),
                password: row.values.at(2).text
              });
            }
          });

          return data;
        }
      })
    },
    // Enable retries for failed tests
    retries: {
      runMode: 1, // Number of retries when running tests (default is 0)
      openMode: 0, // Number of retries in interactive mode (default is 0)
    },
    specPattern: [
      'cypress/e2e/*.js',
      'cypress/e2e/APITesting/*.js'
    ], // include .js files
    excludeSpecPattern: [
      'cypress/e2e/*.*.js',
    ] // Exclude .cy.js and same pattern files
  },
  env: {
    "username": '9685075089',
    "password": 'Amisha@1ak'
  }
});
