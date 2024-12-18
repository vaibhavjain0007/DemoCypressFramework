import { reviewText, reviewTitle } from "../support/constants";
import { TimeFilter } from "../support/enum/Utils";
import { AccountPage, OrdersPage, ReviewPage } from "../support/pages/AccountAndSubaccountPage";

const accountPage = new AccountPage();
const ordersPage = new OrdersPage();
const reviewPage = new ReviewPage();

describe('Amazon Product Review and Rating', () => {

    before(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'))
    })

    beforeEach(() => {
        cy.visit('/')
    });

    it('Should allow a user to submit a product review and verify it', () => {
        // Navigate to "Your Orders" and apply time filter
        accountPage.navigateToYourOrders();
        ordersPage.openTimeFitlerPopover();
        ordersPage.selectTimeFilter(TimeFilter.YEAR(2024));

        // Click "Write a product review"
        ordersPage.clickWriteReviewButton();

        // Rate the product
        reviewPage.rateProduct(5); // 5-star rating

        // Write a review and submit
        reviewPage.writeReview(reviewTitle, reviewText);
        reviewPage.submitReview();
        
        // Validate the review was submitted
        reviewPage.validateReviewSubmission();
    });
});