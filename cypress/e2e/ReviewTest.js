import { reviewText, reviewTitle, successMsg, successMsgSubheader } from "../support/constants";
import { TimeFilter } from "../support/enum/Utils";
// import { AccountAndSubaccountPage } from "../support/pages/AccountAndSubaccountPage";

// const accountPage = new AccountAndSubaccountPage;

describe('Amazon Product Review and Rating', () => {

    before(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'))
    })

    it('Should allow a user to submit a product review and verify it', function () {
        // Navigate to "Your Orders" and apply time filter
        cy.visit('/')
        this.accountPage.navigateToYourOrders();
        this.accountPage.openTimeFitlerPopover();
        this.accountPage.selectTimeFilter(TimeFilter.YEAR(2024));

        // Click "Write a product review"
        this.accountPage.clickWriteReviewButton();

        // Rate the product
        this.accountPage.rateProduct(5); // 5-star rating

        // Write a review and submit
        this.accountPage.writeReview(reviewTitle, reviewText);
        this.accountPage.submitReview();

        // Validate the review was submitted
        this.accountPage.validateReviewSubmission(successMsg, successMsgSubheader);
    });
});