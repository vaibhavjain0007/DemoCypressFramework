class LoginPage {
    // Locators
    get userName() {
        return cy.get('#ap_email')
    }

    get continueBtn() {
        return cy.get('#continue')
    }

    get password() {
        return cy.get('#ap_password')
    }

    get signInBtn() {
        return cy.get('#signInSubmit')
    }

    get signInLabel() {
        return cy.get('.a-box>div h1')
    }

    get blankUserNameErrMsg() {
        return cy.get('#auth-email-missing-alert>div div')
    }

    get blankPasswordErrMsg() {
        return cy.get('#auth-password-missing-alert>div div')
    }

    get wrongUsernameOrPasswordErrMsg() {
        return cy.get('[id*="auth-error"] span')
    }

    // Actions
    visit() {
        cy.visit('/')
    }

    enterUserName(username) {
        this.userName.type(username)
    }

    enterPassword(password) {
        this.password.type(password)
    }

    clickContinueBtn() {
        this.continueBtn.click()
    }

    clickSignInBtn() {
        this.signInBtn.click()
    }

    verifyBlankUserIDErrMsg(blankUsernameErrMsg){
        return this.blankUserNameErrMsg.invoke('text').then((getBlankUsernameErr) =>{
            getBlankUsernameErr = getBlankUsernameErr.trim()
                expect(getBlankUsernameErr).to.have.equal(blankUsernameErrMsg);
        });
    }

    verifyBlankPasswordErrMsg(blankPasswordErrMsg){
        this.blankPasswordErrMsg.invoke('text').then((getBlankPasswordErr) => {
            getBlankPasswordErr = getBlankPasswordErr.trim();
            expect(getBlankPasswordErr).to.have.equal(blankPasswordErrMsg);
        })
    }

    verifyWrongUsernameOrPasswordErrMsg(wrongUsrOrPswdErrMsg){
        this.wrongUsernameOrPasswordErrMsg.invoke('text').then((wrongErrorMessage) => {
            wrongErrorMessage = wrongErrorMessage.trim();
            expect(wrongErrorMessage).to.have.equal(wrongUsrOrPswdErrMsg)
        });
    }
}

export default LoginPage;