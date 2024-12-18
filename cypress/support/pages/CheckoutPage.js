const selectors = {
    checkout: {
        addressForm: {
            addNewAddress: "#add-new-address-popover-link",
            fullName: "[id$=enterAddressFullName]",
            phoneNumber: "[id$=enterAddressPhoneNumber]",
            postalCode: "[id$=enterAddressPostalCode]",
            addressLine1: "[id$=enterAddressLine1]",
            addressLine2: "[id$=enterAddressLine2]",
            city: "[id$=enterAddressCity]",
            state: "select[id*=enterAddressStateOrRegion]",
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
        cy.get(selectors.checkout.addressForm.addNewAddress).click()
        cy.get(selectors.checkout.addressForm.fullName).type(address.fullName);
        cy.get(selectors.checkout.addressForm.phoneNumber).type(address.phoneNumber);
        cy.get(selectors.checkout.addressForm.postalCode).type(address.pinCode);
        cy.get(selectors.checkout.addressForm.addressLine1).type(address.address1);
        cy.get(selectors.checkout.addressForm.addressLine2).type(address.address2);
        cy.get(selectors.checkout.addressForm.city).type(address.city);
        cy.get(selectors.checkout.addressForm.state).select(address.state, { force: true });
        return cy.get(selectors.checkout.addressForm.useAddressButton).click();
    }

    validateAddress() {
        return cy.get(selectors.checkout.addressValidation.addressChangebutton, { timeout: 10000 }).should('exist');
    }
}