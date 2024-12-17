const selectors = {
    cart: {
    proceedToCheckoutButton: "[name='proceedToRetailCheckout']",
    quantityDropdownButton: ".a-dropdown-prompt",
    quantityDropdown: "#quantity", 
    },
    verifyProductAdded:{
        productTitle: "span.sc-product-title"
    }
}

export class CartPage {
    proceedToCheckout() {
        return cy.get(selectors.cart.proceedToCheckoutButton).click();
    }

    verifyProductAdded(productName) {
        return cy.get(selectors.verifyProductAdded.productTitle).should('contain', productName);
    }
}