// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Cypress.on('uncaught:exception', (err, runnable) => {
//     // Ignore "Failed to fetch" errors
//     if (err.message.includes('Failed to fetch')) {
//       return false; // Prevent Cypress from failing the test
//     }
//     // Let other exceptions fail the test
//     return true;
//   });
// describe('Fetch error handling', () => {
//     it('Should ignore fetch errors and continue testing', () => {
//       // Test that triggers a fetch failure
//       cy.visit('/some-page'); // Visits a page where a fetch fails
//       cy.get('#fetch-trigger').click(); // Triggers a fetch request
  
//       // Assert that the application displays an error message
//       cy.get('.error-message').should('contain', 'Failed to fetch data');
//     });
//   });

  Cypress.on('uncaught:exception', () => {
    return false; // Ignore all uncaught exceptions
  });
  
  // Cypress.on("window:before:load", (win) => {
  //   cy.stub(win, "fetch").callsFake((url) => {
  //     if (url.endsWith(".css")) {
  //       return new Response("", { status: 200 });
  //     }
  //     return fetch(url);
  //   });
  //});