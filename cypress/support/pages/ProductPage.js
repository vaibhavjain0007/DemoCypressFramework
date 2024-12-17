const selectors = {
    productPage: {
        addToCartButton: "button[id^='a-autoid'][id$='announce']",
        addToWishlistButton: "[title='Add to Wish List']", 
        viewWishlistLink: "#huc-view-your-list-button", 
    },
    checkOut: {
        cartButton: "#nav-cart",
        proceedToCheckoutButton: "[name='proceedToRetailCheckout']",
    }
};

export class ProductPage {
    addToCart() {
        return cy.get(selectors.productPage.addToCartButton).eq(0).click({force:true});
    }

    proceedToCheckout() {
        return cy.get(selectors.checkOut.proceedToCheckoutButton).click();
    }

    goToCart() {
        return cy.get(selectors.checkOut.cartButton).should('be.visible').click();
    }

    addToWishlist() {
        return cy.get(selectors.productPage.addToWishlistButton).click({force:true});
    }

    navigateToWishlist() {
        return cy.get(selectors.productPage.viewWishlistLink).click();
    }
}