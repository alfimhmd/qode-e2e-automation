import { faker } from '@faker-js/faker';

class CareerAuth {
    elements = {
      emailInput: () => cy.get("fieldset[role='group'] > input[name='email']"),
      sendVerificationButton: () => cy.get(".css-18efwaz"),
    };
  
    typeEmail() {
        const email = 'alfirizqimuhamad' + `@${Cypress.env('MAILOSAUR_SERVER_ID')}.mailosaur.net`;
        this.elements.emailInput().type(email);
        return email;
    }
  
    clickVerificationButton() {
      this.elements.sendVerificationButton().click();
    }
  }
  
  export const careerAuthInstance = new CareerAuth();
  