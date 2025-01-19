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
        starRating: ".ryp__star__button",
        reviewTitle: "#scarface-review-title-label",
        reviewText: "#scarface-review-text-card-title",
        submitButton: '[data-hook="ryp-review-submit-button"]',
        submittedReview: ".ryp__thank-you-title",
    }
};

export class AccountAndSubaccountPage {
    navigateToYourOrders() {
        cy.get(selectors.accountMenu.accountMenuButton).trigger('mouseover');
        return cy.get(selectors.accountMenu.yourOrders).click({ force: true });
    }

    clickWriteReviewButton() {
        cy.pause()
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
                cy.pause()
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

    validateReviewSubmission(successMsg) {
        return cy.get(selectors.review.submittedReview)
            .should('contain', successMsg);
    }
}