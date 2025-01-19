const selectors = {
    username: '[id^=ap_email]',
    continueBtn: '#continue',
    password: '#ap_password',
    signInBtn: '#signInSubmit',
    signInLabel: '.a-box>div h1',
    blankUsernameErr: '#auth-email-missing-alert>div div',
    blankPasswordErr: '#auth-password-missing-alert>div div',
    WrongUserPassErr: '[id*="auth-error"] span'
}

export class LoginPage {
    enterUserName(username) {
        cy.get(selectors.username).type(username)
    }

    enterPassword(password) {
        cy.get(selectors.password).type(password)
    }

    clickContinueBtn() {
        cy.get(selectors.continueBtn).click()
    }

    clickSignInBtn() {
        cy.get(selectors.signInBtn).click()
    }

    verifyBlankUserIDErrMsg(blankUsernameErrMsg){
        return cy.get(selectors.blankUsernameErr).invoke('text').then((getBlankUsernameErr) =>{
            getBlankUsernameErr = getBlankUsernameErr.trim()
                expect(getBlankUsernameErr).to.have.equal(blankUsernameErrMsg);
        });
    }

    verifyBlankPasswordErrMsg(blankPasswordErrMsg){
        cy.get(selectors.blankPasswordErr).invoke('text').then((getBlankPasswordErr) => {
            getBlankPasswordErr = getBlankPasswordErr.trim();
            expect(getBlankPasswordErr).to.have.equal(blankPasswordErrMsg);
        })
    }

    verifyWrongUsernameOrPasswordErrMsg(wrongUsrOrPswdErrMsg){
        cy.get(selectors.WrongUserPassErr).invoke('text').then((wrongErrorMessage) => {
            wrongErrorMessage = wrongErrorMessage.trim();
            expect(wrongErrorMessage).to.have.equal(wrongUsrOrPswdErrMsg)
        });
    }
}