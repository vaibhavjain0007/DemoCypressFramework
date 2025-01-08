import { reviewText, reviewTitle } from "../support/constants";
import { TimeFilter } from "../support/enum/Utils";
import { AccountAndSubaccountPage } from "../support/pages/AccountAndSubaccountPage";

const accountPage = new AccountAndSubaccountPage;

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
        accountPage.openTimeFitlerPopover();
        accountPage.selectTimeFilter(TimeFilter.YEAR(2024));

        // Click "Write a product review"
        accountPage.clickWriteReviewButton();

        // Rate the product
        accountPage.rateProduct(5); // 5-star rating

        // Write a review and submit
        accountPage.writeReview(reviewTitle, reviewText);
        accountPage.submitReview();

        // Validate the review was submitted
        accountPage.validateReviewSubmission();
    });
});