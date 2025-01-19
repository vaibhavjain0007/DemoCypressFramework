const selectors = {
    checkout: {
        addressForm: {
            changeAddress: ".a-span2 > .a-declarative > [data-testid]",
            addNewAddress: "#add-new-address-popover-link",
            fullName: "[id$=enterAddressFullName]",
            phoneNumber: "[id$=enterAddressPhoneNumber]",
            postalCode: "[id$=enterAddressPostalCode]",
            addressLine1: "[id$=enterAddressLine1]",
            addressLine2: "[id$=enterAddressLine2]",
            city: "[id$=enterAddressCity]",
            country: "select[id*=countryCode]",
            state: "[id*=enterAddressStateOrRegion]",
            useAddressButton: "[id$=submit-button]",
        },
        addressValidation: {
            addressChangebutton: "#addressChangeLinkId",
            addressCheck: ".displayAddressUL"
        }
    }
};

export class CheckoutPage {
    fillAddressDetails(address) {
        cy.get(selectors.checkout.addressForm.changeAddress).click();
        cy.get(selectors.checkout.addressForm.addNewAddress).should('exist', {timeout: 8000})
        cy.get(selectors.checkout.addressForm.addNewAddress).click();
        cy.get(selectors.checkout.addressForm.country).select('IN', { force: true });
        cy.get(selectors.checkout.addressForm.fullName).clear().type(address.fullName, {delay: 50});
        cy.get(selectors.checkout.addressForm.phoneNumber).clear().type(address.phoneNumber);
        cy.get(selectors.checkout.addressForm.postalCode).clear().type(address.pinCode);
        cy.get(selectors.checkout.addressForm.addressLine1).clear().type(address.address1);
        cy.get(selectors.checkout.addressForm.addressLine2).clear().type(address.address2);
        cy.get(selectors.checkout.addressForm.city).clear().type(address.city);
        cy.get(selectors.checkout.addressForm.state).clear().type(address.state, { force: true });
        return cy.get(selectors.checkout.addressForm.useAddressButton).click();
    }

    validateAddress() {
        return cy.get(selectors.checkout.addressValidation.addressChangebutton, { timeout: 10000 }).should('exist');
    }
}