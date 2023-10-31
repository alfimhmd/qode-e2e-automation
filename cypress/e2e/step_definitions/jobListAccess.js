import {
    Given,
    When,
    Then,
  } from "@badeball/cypress-cucumber-preprocessor";
  import { careerAuthInstance as CareerAuth } from "@pages/CareerAuth";

  const serverId = Cypress.env('MAILOSAUR_SERVER_ID')
  let verifyLink

  Given("the user is on the Job Listing page", () => {
    cy.visit("https://qode.world/career/job-listing");
  })

  When('the user should see the job listings', () => {
    // Get the total count from the text
    cy.get('.css-7v9435').then(($countText) => {
        const countText = $countText.text();
        const totalCount = parseInt(countText.match(/\d+/)[0]);

        cy.log(countText)
        cy.log(totalCount)

        // Target the job listing elements
        cy.get('.infinite-scroll-component > div > div').then(($jobListings) => {
            // Ensure the count of job listings matches the total count
            expect($jobListings.length).to.equal(totalCount);

            // Iterate through each job listing
            cy.wrap($jobListings).each(($jobListing, index) => {
                // Verify job title
                cy.wrap($jobListing).find('.chakra-text.css-ae9uus')
                    .should('be.visible')
                    .and('not.be.empty');

                // Verify job location
                cy.wrap($jobListing).find('.chakra-text.css-4nvknv')
                    .should('be.visible')
                    .and('not.be.empty');

                // Verify workplace type
                cy.wrap($jobListing).find('.chakra-text.css-2l05b8')
                    .should('be.visible')
                    .and('not.be.empty');

                  //   if (index === 0) {
                  //     cy.wrap($jobListing).find('.chakra-text.css-ae9uus')
                  //         .should('have.text', 'Senior Game Designer - Origins');
                  // }

            });
        });
    });
  });

  Then("the user should see the {string} prompt", (string) => {
    cy.get('button.chakra-button.css-2koxwz')
      .scrollIntoView()
      .should('be.visible')
      .then(($button) => {
        cy.wrap($button).should('contain', string);
        cy.contains(string).should('be.visible');
      });
  })

  Given("the user has navigated to the Career Auth page", () => {
    cy.visit("/");
  });

  When("the user enters a valid email address in the email input field", () => {
    cy.wrap(CareerAuth.typeEmail()).as('email');
  });

  Then("the user clicks on {string}", () => {
    cy.contains('button', 'Send Verification Link').should('be.visible');
    CareerAuth.clickVerificationButton();
  })

  Given("a verification link should be sent to the entered email address", () => {
    cy.contains('A verification link has been sent to your email').should('be.visible');
    cy.contains('Please check your inbox to complete the sign-in process.').should('be.visible');
    
    cy.get('@email').then((email) => {
      cy.get(".css-o10w11").should('contain.text', email);
    });    

    const oneDayAgo = new Date(Date.now() - 864e5); // 864e5 is 1 day in milliseconds

    cy.get('@email').then(email => {
      cy.mailosaurGetMessage(serverId, {
          sentTo: email,
          receivedAfter: oneDayAgo
      }, { timeout: 60000 }).then(emailResponse => {
          cy.log(emailResponse.subject);
          expect(emailResponse.subject).to.equal('[qode] - Confirm your email to login');
          verifyLink = emailResponse.html.links[1].href;
      });
  });
  })

  When("the user has logged in with valid credentials", () => {
    cy.visit(verifyLink)
  })

  Then("the user should see any additional features or information available post login", () => {

  })

  // When('should upload a file', () => {
  //   cy.wait(2000)
  //   cy.get('.css-7b7av0 > .chakra-stack').should('be.visible')
  //   .attachFile('[CV]Alfi.pdf', { subjectType: 'drag-n-drop' });

  //   function uploadFile(retries = 3) {
  //     cy.wait(3000)
  //     cy.get('.css-7b7av0 > .chakra-stack').should('be.visible')
  //       .attachFile('[CV]Alfi.pdf', { subjectType: 'drag-n-drop' });
  
  //     cy.wait('@uploadRequest').then(interception => {
  //       if (interception.response.statusCode === 500 && retries > 0) {
  //         cy.log(`Retry upload attempt ${4 - retries}...`);
  //         uploadFile(retries - 1);
  //       }
  //     });
  //   }
    
  //   // Execute the function to start the upload process
  //   uploadFile();

  //   function uploadFileAPI(retries = 3) {
  //     // Read file content and send as POST request
  //     cy.fixture('[CV]Alfi.pdf', 'binary').then(fileContent => {
  //       cy.request({
  //         method: 'POST',
  //         url: 'https://resume-parser-ms-app.azurewebsites.net/upload?flow=onboarding',
  //         body: fileContent,
  //         encoding: 'binary',
  //         headers: {
  //           'Content-Type': 'application/pdf'
  //         }
  //       }).then(response => {
  //         if (response.status === 500 && retries > 0) {
  //           cy.log(`Retry upload attempt ${4 - retries}...`);
  //           uploadFileAPI(retries - 1);
  //         }
  //       });
  //     });
  //   }
    
  //   // Execute the function to start the upload process via API
  //   uploadFileAPI();    

  //   cy.get('.chakra-button').click()
  // })




