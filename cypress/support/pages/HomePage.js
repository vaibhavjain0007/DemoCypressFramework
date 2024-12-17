class HomePage {
    // Locators
    get signIn() {
        return cy.get('#nav-link-accountList')
    }

    get orders() {
        return cy.get('#nav-orders')
    }

    get search() {
        return cy.get('#twotabsearchtextbox')
    }

    // Actions
    clickSignIn() {
        this.signIn.click()
    }

    searchProduct(productName) {
        this.search.type(productName)
    }

    enterOnSearch() {
        this.search.type('{enter}')
    }

    navigateToOrders() {
        this.orders().click()
    }
}

export default HomePage;