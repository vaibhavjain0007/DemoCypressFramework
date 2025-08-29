// import { CartPage } from "../support/pages/CartPage";
// import { CheckoutPage } from "../support/pages/CheckoutPage";
// import { LoginPage } from "../support/pages/LoginPage";
// import { ProductPage } from "../support/pages/ProductPage";
// import { ProductSearchPage } from "../support/pages/ProductSearchPage";

// const productSearchPage = new ProductSearchPage;
// const productPage = new ProductPage;
// const cartPage = new CartPage;
// const checkoutPage = new CheckoutPage;
// const loginPage = new LoginPage;

describe('Amazon.in Product Search, Add to Cart and Checkout Test', function() {

    let product;
    let address;
    before(() => {
        cy.fixture('product').then((productDetails) => {
            product = productDetails;
        });
        cy.fixture('address').then((addressDetails) => {
            address = addressDetails;
        });
    });

    it('Search for a product, add it to the cart, and proceed to checkout', function() {
        cy.visit('/')
        // Search for the product
        this.productSearchPage.searchProduct(product.name);
        this.productSearchPage.clickSearchButton();

        // Select the specific product and add to cart
        this.productPage.addToCart(product.name);
        // price assertion

        // Go to the cart and verify the product is added
        this.productPage.goToCart();
        this.cartPage.verifyProductAdded(product.name);
        this.loginPage.clickSignInBtn()

        // Proceed to checkout
        this.cartPage.proceedToCheckout();
        this.loginPage.enterUserName(Cypress.env('username'))
        this.loginPage.clickContinueBtn()
        this.loginPage.enterPassword(Cypress.env('password'))

        // Fill in the necessary details (address, payment method)
        this.checkoutPage.fillAddressDetails(address);
        this.checkoutPage.validateAddress();
    });
});