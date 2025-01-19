import { LoginPage } from "../support/pages/LoginPage";

describe('Test Suite 1', () => {

    before('before all', () => {
        cy.login(Cypress.env('username'), Cypress.env('password'))
    })

    beforeEach('login', () => {
        cy.visit('/')
    })

    it('test logo visibility', () => {
        cy.get('#nav-logo').should('be.visible')
    })

    it('test saerch and select product among results shown', () => {
        cy.get('#twotabsearchtextbox').type('vivo t3 5g mobile')

        cy.get('.left-pane-results-container > div').each(($el, index, $list) => {
            cy.log('outside')
            if ($el.text().includes('vivo t3 5g mobile phone cover')) {
                cy.log('inside**********************************************************************************8')
                cy.get('.left-pane-results-container > div').eq(index).realClick()
                return
            }
        })

        // cy.contains('Vivo Y200 5G Mobile (Jungle Green, 8GB RAM, 256GB Storage)')
        //     .should('be.visible')
        //     .invoke('removeAttr', 'target')
        //     .click()
    })

    it.skip ('search product, filter by brand, add to cart, validate cart', () => {
        cy.get('#nav-xshop-container a').contains('Mobiles').realClick()
        cy.contains('Brands').parent().siblings('ul').find('li').each(($el, index, $list) => {
            /*
             *  checking checkboxes --> check will only check if the checkbox is not already checked 
             *  but if we use click then it will uncheck the checked one and vice versa
            */
            if ($el.text().includes('Vivo')) {
                cy.log('Vivo')
                cy.wrap($el).find('input').scrollIntoView({ duration: 2000 }).check({ force: true })
                return
            }
        })
        cy.get('body').find('.a-changeover-inner').should('have.length', 0)
        cy.get("[data-component-type='s-search-result']").each(($el, index, $list) => {
            if ($el.text().includes('Vivo T3x 5G (Celestial Green, 128 GB) (6 GB RAM)')) {
                cy.wrap($el).contains('ADD TO CART', { matchCase: false }).click()
                return
            }
        })
        cy.get('.a-changeover-inner', {timeout : 8000}).should('have.text', 'Item Added')
        cy.get('.a-changeover-inner').should('be.visible')

        // Validate cart
        cy.get('#nav-cart').click()
        cy.get('.a-size-extra-large').should('include.text', 'Shopping Cart')
        cy.get('[name=proceedToRetailCheckout]').click()
        cy.getMatchedElement('[data-action=select-address-in-list]', '192').find('input').check().should('be.checked')
        cy.get('[data-testid=Address_selectShipToThisAddress]').click()
    })

    afterEach('after each', () => {
        cy.log('after each')
    })

    after('after all', () => {
        cy.log('after all')
    })
})