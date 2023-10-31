class JobListPage {
    elements = {
      signInBtn: () => cy.get(".chakra-button.css-1cy583w"),
      signInToViewMoreBtn: () => cy.get(".chakra-button.css-4hika3 > .chakra-text.css-1qul0o"),
      jobDetailBtn: () => cy.get("div:nth-of-type(4) > .css-19zlkw9 > .css-zoi8bs > .css-gdx2i7 > .chakra-button.css-17q2s0q"),
      
      searchField: () => cy.get(".css-1bdh7lo"),
      resultFound: () => cy.get(".chakra-text.css-wb9f3b"),
      jobName: () => cy.get("div:nth-of-type(1) > .chakra-text.css-ae9uus"),

      skillField: () => cy.get("div:nth-of-type(2) > .css-f487ku > .css-bk7pyt > .css-wjrolq"),
      
      fullTimeBtn: () => cy.get(".css-pfu4y7"),
      partTimeBtn: () => cy.get(".css-1k5hnq2")      


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
  
  export const jobListInstance = new JobListPage();
  