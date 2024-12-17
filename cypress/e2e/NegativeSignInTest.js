import HomePage from "../support/pages/HomePage";
import LoginPage from "../support/pages/LoginPage";

describe('Negative SignIn Page Test', () => {
    const loginPage = new LoginPage()
    const homePage = new HomePage()

    let data;

    before(() => {
        cy.fixture("signInErrMsgs").then((fixtureData) => {
            data = fixtureData;
        });
    });

    beforeEach(() => {
        cy.visit('/');
        homePage.clickSignIn();
    });

    it('verify the error message for blank username', { retries: 0 }, () => {
        loginPage.clickContinueBtn();
        cy.log(data)
        loginPage.verifyBlankUserIDErrMsg(data.blankUsernameErrMsg);
    });

    it('verify the error message for blank password', () => {
        loginPage.enterUserName(Cypress.env('username'));
        loginPage.clickContinueBtn();
        loginPage.clickSignInBtn();
        loginPage.verifyBlankPasswordErrMsg(data.blankPasswordErrMsg);
    });

    it('verify the error message for wrong username', () => {
        loginPage.enterUserName(data.wrongMobNum);
        loginPage.clickContinueBtn();
        loginPage.verifyWrongUsernameOrPasswordErrMsg(data.wrongUsernameErrMsg);
    });

    it('verify the error message for wrong password', () => {
        loginPage.enterUserName(Cypress.env('username'));
        loginPage.clickContinueBtn();
        loginPage.enterPassword(data.wrongPassword);
        loginPage.clickSignInBtn();
        loginPage.verifyWrongUsernameOrPasswordErrMsg(data.wrongPasswordErrMsg);
    });
});