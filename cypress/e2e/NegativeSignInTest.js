import { HomePage, LoginPage } from "../support/pages";

describe('Negative SignIn Page Test', () => {
    const loginPage = new LoginPage();
    const homePage = new HomePage();

    let errors;

    before(() => {
        cy.fixture("signInErrMsgs").then((fixtureData) => {
            errors = fixtureData;
        });
    });

    beforeEach(() => {
        cy.visit('/');
        homePage.clickSignIn();
    });

    it('verify the error message for blank username', { retries: 0 }, () => {
        loginPage.clickContinueBtn();
        cy.log(errors)
        loginPage.verifyBlankUserIDErrMsg(errors.blankUsernameErrMsg);
    });

    it('verify the error message for blank password', () => {
        loginPage.enterUserName(Cypress.env('username'));
        loginPage.clickContinueBtn();
        loginPage.clickSignInBtn();
        loginPage.verifyBlankPasswordErrMsg(errors.blankPasswordErrMsg);
    });

    it('verify the error message for wrong username', () => {
        loginPage.enterUserName(errors.wrongMobNum);
        loginPage.clickContinueBtn();
        loginPage.verifyWrongUsernameOrPasswordErrMsg(errors.wrongUsernameErrMsg);
    });

    it('verify the error message for wrong password', () => {
        loginPage.enterUserName(Cypress.env('username'));
        loginPage.clickContinueBtn();
        loginPage.enterPassword(errors.wrongPassword);
        loginPage.clickSignInBtn();
        loginPage.verifyWrongUsernameOrPasswordErrMsg(errors.wrongPasswordErrMsg);
    });
});