import { TimeFilter } from "../enum/Utils";

const selectors = {
    accountMenu: {
        accountMenuButton: "#nav-link-accountList",
        yourOrders: "#nav_prefetch_yourorders",
    },
    orders: {
        recentOrder: ".order",
        writeReviewButton: "a[href*='review']",
        timeFilter: '#a-autoid-1-announce'
    },
    review: {
        starRating: "span[class*='starRating']",
        reviewTitle: "#reviewTitle",
        reviewText: "#reviewText",
        submitButton: '.a-button-input',
        submittedReview: "[data-testid=in-context-ryp__thankyou-text]",
        subHeaderText: '.in-context-ryp__thankyou-subheader'
    }
};

export class AccountAndSubaccountPage {
    navigateToYourOrders() {
        cy.get(selectors.accountMenu.accountMenuButton).trigger('mouseover');
        return cy.get(selectors.accountMenu.yourOrders).click({ force: true });
    }

    clickWriteReviewButton() {
        return cy.get(selectors.orders.writeReviewButton).first().click();
    }

    openTimeFitlerPopover() {
        return cy.get(selectors.orders.timeFilter).click()
    }

    /**
     * Validates the year.
     * @param {TimeFilter} timeFilter - The year to validate.
     */
    selectTimeFilter(timeFilter) {
        cy.get('.a-popover-inner ul li').each(($el, index, $list) => {
            if ($el.text().includes(timeFilter)) {
                return cy.wrap($el).click()
            }
        })
    }

    rateProduct(starIndex) {
        return cy.get(selectors.review.starRating).eq(starIndex - 1).click();
    }

    writeReview(title, text) {
        cy.get(selectors.review.reviewTitle).clear().type(title);
        return cy.get(selectors.review.reviewText).clear().type(text);
    }

    submitReview() {
        return cy.get(selectors.review.submitButton).click();
    }

    validateReviewSubmission(successMsg, successMsgSubheader) {
        cy.get(selectors.review.submittedReview)
        .should('contain', successMsg);
        cy.get(selectors.review.subHeaderText)
        .should('contain', successMsgSubheader);
    }
}