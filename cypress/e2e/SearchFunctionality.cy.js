describe ('Test search functionality', () => {

    before('before all', () => {
        cy.login(Cypress.env('username'), Cypress.env('password'))
    })

    beforeEach('login', () => {
        cy.visit('/')
    })

    it('test search and select product among results shown', { retries : 1 }, () => {
        cy.get('#twotabsearchtextbox').type('vivo t3 5g mobile new 2024 256 gb')
        // cy.contains('vivo t3 5g mobile new 2024 256 gb').click()

        cy.get('.left-pane-results-container > div').should('have.length.at.least', 1)
        cy.get('.left-pane-results-container > div').each(($el, index, $list) => {
            if ($el.text().includes('vivo t3 5g mobile new 2024 256 gb')) {
                cy.get('.left-pane-results-container > div').eq(index).as('ele')
                cy.get('@ele').click()
                return false
            }
        })

        cy.contains('Vivo T3 5G (Cosmic Blue, 128 GB) (8 GB RAM)')
            .should('be.visible')
            .invoke('removeAttr', 'target')
            .click()
    })
})