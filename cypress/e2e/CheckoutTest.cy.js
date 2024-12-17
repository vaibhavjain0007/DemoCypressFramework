import { CartPage } from "../support/pages/CartPage";
import { CheckoutPage } from "../support/pages/CheckoutPage";
import LoginPage from "../support/pages/LoginPage";
import { ProductPage } from "../support/pages/ProductPage";
import { ProductSearchPage } from "../support/pages/ProductSearchPage";

const productSearchPage = new ProductSearchPage();
const productPage = new ProductPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const loginPage = new LoginPage();

describe('Amazon.in Product Search, Add to Cart and Checkout Test', () => {

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

    beforeEach(() => {
        cy.visit('/')
    })

    it('Search for a product, add it to the cart, and proceed to checkout', () => {
        // Search for the product
        cy.log(product, address)
        productSearchPage.searchProduct(product.name);
        productSearchPage.clickSearchButton();

        // Select the specific product
        productSearchPage.selectProduct(product.name);

        // Add the product to the cart
        productPage.addToCart();

        // Go to the cart and verify the product is added
        productPage.goToCart();
        cartPage.verifyProductAdded(product.name);

        // Proceed to checkout
        cartPage.proceedToCheckout();
        loginPage.enterUserName(Cypress.env('username'))
        loginPage.clickContinueBtn()
        loginPage.enterPassword(Cypress.env('password'))
        loginPage.clickSignInBtn()

        // Fill in the necessary details (address, payment method)
        checkoutPage.fillAddressDetails(address);
        checkoutPage.validateAddress();
    });
});