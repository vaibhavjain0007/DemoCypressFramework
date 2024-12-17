const selectors = {
    search: {
        searchBar: "#twotabsearchtextbox",
        searchButton: "#nav-search-submit-button",
    },
    filters: {
        brand: "span.a-list-item",
    },
    results: {
        productTitles: "div[data-cy='title-recipe']",
        selectProduct: "h2 span",
        productList: ".s-main-slot .s-result-item",
        productTitle: "span.a-text-normal"

    }
};
export class ProductSearchPage {
    searchProduct(searchItem) {
        return cy.get(selectors.search.searchBar).type(searchItem);
    }

    clickSearchButton() {
        return cy.get(selectors.search.searchButton).click();
    }

    getProductTitles() {
        return cy.get(selectors.results.productTitles);
    }

    selectProduct(product) {
        return cy.contains(product)
            .should('be.visible')
            .invoke('removeAttr', 'target')
            .click()
    }

    applyBrandFilter(brandName) {
        return cy.get(selectors.filters.brand).contains(brandName).click();
    }

    validateFilteredResults() {
        return cy.get(selectors.results.selectProduct).should('have.length.greaterThan', 0);
    }

    validateBrandFilter(brandName) {
        return cy.get(selectors.results.selectProduct).each(($el) => {
            cy.log($el.text());
            const regex = new RegExp(brandName, 'i');
            cy.wrap($el).should(($span) => {
                const actualText = $span.text();
                expect(regex.test(actualText)).to.be.true;
            });
        });
    }
}