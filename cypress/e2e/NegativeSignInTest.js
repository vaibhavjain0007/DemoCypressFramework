import { HomePage } from "../support/pages/HomePage";
import { LoginPage } from "../support/pages/LoginPage";


describe('Negative SignIn Page Test', () => {
    // const loginPage = new LoginPage;
    // const homePage = new HomePage;

    let errors;

    before(() => {
        cy.fixture("signInErrMsgs").then((fixtureData) => {
            errors = fixtureData;
        });
    });

    beforeEach(() => {
        cy.visit('/');
        this.homePage.clickSignIn();
    });

    it('verify the error message for blank username', { retries: 0 }, () => {
        this.loginPage.clickContinueBtn();
        cy.log(errors)
        this.loginPage.verifyBlankUserIDErrMsg(errors.blankUsernameErrMsg);
    });

    it('verify the error message for blank password', () => {
        this.loginPage.enterUserName(Cypress.env('username'));
        this.loginPage.clickContinueBtn();
        this.loginPage.clickSignInBtn();
        this.loginPage.verifyBlankPasswordErrMsg(errors.blankPasswordErrMsg);
    });

    it('verify the error message for wrong username', () => {
        this.loginPage.enterUserName(errors.wrongMobNum);
        this.loginPage.clickContinueBtn();
        this.loginPage.verifyWrongUsernameOrPasswordErrMsg(errors.wrongUsernameErrMsg);
    });

    it('verify the error message for wrong password', () => {
        this.loginPage.enterUserName(Cypress.env('username'));
        this.loginPage.clickContinueBtn();
        this.loginPage.enterPassword(errors.wrongPassword);
        this.loginPage.clickSignInBtn();
        this.loginPage.verifyWrongUsernameOrPasswordErrMsg(errors.wrongPasswordErrMsg);
    });
});