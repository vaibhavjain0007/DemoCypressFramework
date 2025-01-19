const selectors = {
    signIn: '#nav-link-accountList',
    orders: '#nav-orders',
    search: '#twotabsearchtextbox'
}

export class HomePage {
    clickSignIn() {
        cy.get(selectors.signIn).click()
    }

    searchProduct(productName) {
        cy.get(selectors.search).type(productName)
    }

    enterOnSearch() {
        cy.get(selectors.search).type('{enter}')
    }

    navigateToOrders() {
        cy.get(selectors.orders).click()
    }
}