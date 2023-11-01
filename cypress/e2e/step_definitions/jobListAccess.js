import {
    Given,
    When,
    Then,
  } from "@badeball/cypress-cucumber-preprocessor";
  import { careerAuthInstance as CareerAuth } from "@pages/CareerAuth";
  import { faker } from "@faker-js/faker";

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
            expect($jobListings.length).to.equal(totalCount + 1);
            cy.wait(1000)

            // Iterate through each job listing
            cy.wrap($jobListings).each(($jobListing, index) => {
              cy.wait(1000)

              if (index >= totalCount) {
                return false;  // This will skip the rest of the commands in this iteration
            }
                // Verify job title
                cy.wrap($jobListing).find('.chakra-text.css-1v2a002')
                    .scrollIntoView()
                    .should('be.visible')
                    .and('not.be.empty');

                // Verify job location
                cy.wrap($jobListing).find('.chakra-text.css-11cr6rx')
                    .should('be.visible')
                    .and('not.be.empty');

                // Verify workplace type
                cy.wrap($jobListing).find('div.css-1m6lxlp p')
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

  Then("the user should {string} the {string} prompt", (condition, string) => {
    cy.wait(3000)
    if (condition === "not see") {
        // Check that the prompt is not visible
        cy.get('body').then(($body) => {
            if ($body.find('button.chakra-button.css-2koxwz:contains(' + string + ')').length > 0) {
                // If the button is found in the DOM, ensure it's not visible
                cy.log('masuk kesini')
                cy.get('button.chakra-button.css-2koxwz')
                    .should('not.be.visible');
            }
        });
    } else {
        // Check that the prompt is visible
        cy.log('atau kesini')
        cy.get('button.chakra-button.css-2koxwz')
            .scrollIntoView()
            .should('be.visible')
            .then(($button) => {
                cy.wrap($button).should('contain', string);
                cy.contains(string).should('be.visible');
            });
    }
});


  When("the user enters {string} in the job search field", (string) => {
    cy.get(".css-fyyigg").click()
    cy.get('.css-ozgtb0').type(string + "{enter}")
    cy.wait(1000)
    cy.get('.css-17gosq5 > .chakra-button').click()
  })

  Then("the job listings should be filtered to only show {string} {string}", (type, string) => {
    // Get all the job listings
    cy.wait(2000);

    cy.get('.css-7v9435').then(($countText) => {
      const countText = $countText.text();
      const totalCount = parseInt(countText.match(/\d+/)[0]);
    
    cy.get('.chakra-stack.css-qzvunm > .chakra-stack.css-d3rdgh').then(($jobListings) => {
      // Ensure the result found are same with the length of job List  
      expect($jobListings.length).to.equal(totalCount);

      // Ensure there is at least one job listing
        expect($jobListings.length).to.be.greaterThan(0);
        cy.wait(1000)

        cy.wrap($jobListings).each(($jobListing, index) => {
          cy.wait(1000)
        if (type === 'skill') {
        // Ensure every job skill contains the string
          cy.wrap($jobListing).find('.css-aflxt4 > .css-1bb3wt3 .css-cgugvc')
              .should('be.visible')
              .and('contain', string);
      } else if (type === 'job title') {
        // Ensure every job title contains the string
          cy.wrap($jobListing).find('.chakra-text.css-1v2a002')
              .should('be.visible')
              .and('contain', string);
      }else if (type === 'company name') {
        // Ensure every company name contains the string
          cy.wrap($jobListing).find('.css-b9l1nz > .css-xqf2g8 > .css-19er31c > .chakra-stack > .css-98p5vh')
              .should('be.visible')
              .and('contain', string);
      }
    });
    });
  })
});

// When("the user clicks on the {string} job type filter", (string) => {
//   // Find the button containing the specified text (Sort or Filter) and click it
//   cy.get('button.chakra-button').contains(string).click();

//   // First, assert that the text contain string
//   cy.get('.css-18y7tct .css-qodqz1').should('have.text', string);  
//   // Now, click the button
//   cy.get('.css-18y7tct div').click();  
//   cy.get('.chakra-modal__footer > .chakra-button').click()
// })

// When("the user clicks on the {string} to search {string} then {string} for result {string}", (classification, subType, action, result) => {
//   cy.get('.css-190g5fb').click()
//   cy.wait(3000)

//   cy.contains('button.chakra-button', classification).click();

// // First, find the p element containing 'Workplace Type'
// cy.get('.chakra-stack.css-p1hkbd p.chakra-text').contains(subType).then($pElement => {
//   // Log the text of the p element
//   cy.log($pElement.text());
  
//   // Now, navigate to the grandparent of the p element
//   cy.wrap($pElement).parent().parent().within(() => {
//       // Within the grandparent, find the sibling div with class css-1ic03qn
//         // Use the contains function to find the span with the specific text, e.g., 'On-Site'
        
//             // Perform further actions with the span element as needed
//             if (action === "click") {
//               cy.contains('span', result).then($finalElement => {
//                 cy.log($finalElement.text());
//                 cy.wrap($finalElement).click();
//               });
//             } else if (action === "type") {
//               cy.get('input.css-lvgxyv').type(result);
//             } else if (classification === "Sort" & action === "click") {
              
//             }
//   });

//   cy.get('.chakra-modal__footer > .chakra-button').click()
// });
// });



When("the user clicks on the {string} job type filter", (string) => {
  cy.get('.css-190g5fb').click()
  // First, assert that the text contain string
  cy.get('.css-18y7tct .css-qodqz1').should('have.text', string);  
  // Now, click the button
  cy.get('.css-18y7tct div').click();  
  cy.get('.chakra-modal__footer > .chakra-button').click()
})


  When("a message displaying the count of results found should be displayed", () => {
    cy.get('.css-7v9435').then(($countText) => {
      const countText = $countText.text();
      const totalCount = parseInt(countText.match(/\d+/)[0]);
    
    cy.get('.chakra-stack.css-qzvunm > .chakra-stack.css-d3rdgh').then(($jobListings) => {
      // Ensure the result found are same with the length of job List  
      expect($jobListings.length).to.equal(totalCount);

      // Ensure there is at least one job listing
        expect($jobListings.length).to.be.greaterThan(0);
        cy.wait(1000)
    });
  })

})

  Then("the job listings should be filtered only show {string}", (string) => {
    cy.get('.chakra-stack.css-qzvunm > .chakra-stack.css-d3rdgh').then(($jobListings) => {
      // Ensure there is at least one job listing
      expect($jobListings.length).to.be.greaterThan(0);
      cy.wait(1000)
  
      cy.wrap($jobListings).each(($jobListing, index) => {
          cy.wait(1000)
  
          // Click on the job listing to open the modal
          cy.wrap($jobListing).click();
  
          // Wait for the modal to be fully visible
          cy.get('.chakra-modal__content-container').should('be.visible');
  
          // Now find the desired element within the modal and ensure it contains the string
          cy.get('.chakra-modal__content-container')
              .find('.css-z7mtfw > .chakra-stack.css-1igwmid > span')
              .should('be.visible')
              .and('contain', string);
  
          // Close the modal to return to the job listings
          cy.wait(1000)
          cy.get('.css-1bfp7yv').click()
      });
  });
  })

  When("the message {string} should be displayed", (string) => {
   cy.wait(2000)
    cy.get('.css-ugta74')
      .should('be.visible')
      .and('contain', string);
  })

  When("the user clicks on the Sign In button", () => {
    cy.visit("/")
    cy.wait(3000)
  })

  When("the user enters a valid email address in the email input field", () => {
    cy.wrap(CareerAuth.typeEmail()).as('email');
  });

  Then("the user clicks on {string}", () => {
    cy.contains('button', 'Send Verification Link').should('be.visible');
    CareerAuth.clickVerificationButton();
  })

  Given("a verification link should be sent to the entered email address", () => {
    cy.contains('A verification link has been sent to your email').should('be.visible', {timeout: 20000});
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

  Then("the user should not see the {string} prompt", (string) => {
    cy.get('button.chakra-button.css-2koxwz')
      .should('not.be.visible')
      .then(($button) => {
        // Additional check to ensure the text is not present on the page
        cy.contains(string).should('not.exist');
      });
});

When("I found one of the job that fit with my requirement", () =>  {
  function checkJobListings(jobListings, index = 0) {
    if (index >= jobListings.length) {
      // All job listings have been checked
      return;
    }
  
    // Click on the job listing to open the modal
    cy.wrap(jobListings[index]).click();
  
    // Wait for the modal to be fully visible
    cy.get('.chakra-modal__content-container').should('be.visible');
  
    // Now find the Apply button within the modal
    cy.get('.chakra-modal__content-container')
      .find('button:contains("Apply")').then(($buttons) => {
        let applyButtonClicked = false;
        $buttons.each((i, button) => {
          // Checking if the button is disabled
          cy.wait(2000);
          if (!button.hasAttribute('disabled')) {
            // If the button is not disabled, clicking the button
            cy.wrap(button).click();
            applyButtonClicked = true;
            return false;  // Attempt to exit the .each loop
          }
        });
        return cy.wrap({ applyButtonClicked });  // Wrap the value in a cy object
      }).then((result) => {
        if (!result.applyButtonClicked) {
          // If the Apply button was not clicked, close the modal to return to the job listings
          cy.wait(1000);
          cy.get('.css-1bfp7yv').click();
          // Recursively check the next job listing
          checkJobListings(jobListings, index + 1);
        }
      });
  }
  
  cy.get('.chakra-stack.css-qzvunm > .chakra-stack.css-d3rdgh').then(($jobListings) => {
    // Ensure there is at least one job listing
    expect($jobListings.length).to.be.greaterThan(0);
    cy.wait(1000);
  
    checkJobListings($jobListings.toArray());
  });  
});

Then("the user will apply the position and complete the required form", () => {
  const FILL_TEXT = faker.lorem.words(5);

  cy.wait(2000)
  cy.get('div[role="dialog"].chakra-modal__content')
    .should('be.visible')
    .find('.chakra-modal__footer > .chakra-button')
    .click();

    // Filling out the three input fields
    cy.get('input[name="notice_period"]').type('30');  // Assuming 30 days notice period
    cy.get('input[name="current_salary_text"]').type('50000');  // Assuming current salary is 50,000
    cy.get('input[name="expected_salary_text"]').type('60000');  // Assuming expected salary is 60,000
  
    // Clicking the button in the footer again
    cy.get('.css-53u3k')
      .should('be.visible')
      .and('contain', 'Next')
      .click();

      cy.get('textarea[name="motivation"]').type(FILL_TEXT)
      cy.get('textarea[name="reason_for_leaving"]').type(FILL_TEXT)

    // Clicking the button in the footer again
    cy.get('.css-53u3k')
      .should('be.visible')
      .and('contain', 'Next')
      .click();

    cy.get('.css-53u3k')
      .should('be.visible')
      .and('contain', 'Review')
      .click();
      cy.wait(1000)

      cy.get('div[role="dialog"][id="chakra-modal-:r2d:"]')
        .should('be.visible')
        .within(() => {
          cy.get('footer.chakra-modal__footer')
            .find('button.chakra-button:contains("Close")')
            .click();
        });

        cy.get('div[role="dialog"][id="chakra-modal-:r2b:"]')
        .should('be.visible')
        .scrollTo('bottom', {ensureScrollable: false})
        .within(() => {
          cy.get('.css-i0tact')
          .scrollIntoView({ duration: 2000 })
            .should('be.visible')
          cy.get('footer.chakra-modal__footer')
            .find('button.chakra-button:contains("Submit")')
            .click();
        });
      
    
});



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




