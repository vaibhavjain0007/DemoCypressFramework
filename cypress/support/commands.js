// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"

// Cypress Custom commands
Cypress.Commands.add('switchToIframe', (iframeSelector) => {
    return cy.get(iframeSelector)
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap)
})

Cypress.Commands.add('getMatchedElement', ($element, text) => {
  cy.get($element).each(($el, index, $list) => {
      if ($el.text().includes(text, {matchCase: false})) {
          // cy.wrap($el).find('input').check().should('be.checked')
          return cy.wrap($el)
      }
  })
  return undefined
})

Cypress.on('uncaught:exception', (err, runnable) => {
    // Log the error (optional)
    console.log(err)
  
    // Ignore specific errors (like Google Ads error)
    if (err.message.includes('adsbygoogle.push() error: No slot size for availableWidth=0')) {
      return false; // Prevent the test from failing
    }
  
    // For other errors, you can choose to fail the test by not returning anything
    return true;
  });

  Cypress.Commands.add('login', (username, password) => {
    const homePage = new HomePage()
    const loginPage = new LoginPage()
    cy.session([username, password], () => {
        cy.visit('/', { failOnStatusCode : false })
        homePage.clickSignIn()
        loginPage.enterUserName(Cypress.env('username'))
        loginPage.clickContinueBtn()
        loginPage.enterPassword(Cypress.env('password'))
        loginPage.clickSignInBtn()
    })
  })