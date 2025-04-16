// 
/// <reference types="cypress" />

describe('User Sign-Up Flow', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.contains('Sign Up here').should('exist').click();
    cy.url().should('include', '/signup');
  });

  it('should allow manual OTP verification & signup, and login', () => {

    function fillSignupForm() {
      // Fill out the signup form
      cy.get('#firstName').should('be.visible').type("Asap");
      cy.get('#nameInput').should('be.visible').type("asefa");
      cy.get('.mt-\\[11px\\] > .relative > .w-\\[353\\.04px\\]').type('T@ex.com');
      cy.get('#cName').should('be.visible').type("newcampp");
      cy.get('#passwordInput').should('be.visible').type('Test@1212');
      cy.get('#confirmPasswordInput').should('be.visible').type('Test@1212');
      cy.get('.form-control').clear().should('be.visible').type('251943327311');
      cy.get('.text-\\[13px\\]').click();
      cy.contains('Merchant Service Agreement').should('exist');
      cy.get('.primary_button').click();
      cy.get('.flex-col.justify-center > .w-\\[353\\.04px\\]').click(); // Submit signup
    }

    fillSignupForm();

    // Wait for OTP modal to appear
    cy.get('.modal-content', { timeout: 40000 }).should('be.visible');
    cy.get('.modal-content > .w-\\[371px\\] > .text-center')
      .should('contain', 'Verify your phone number');

    // Pause for manual OTP entry by tester
    cy.log('Please manually enter the OTP on the UI, then resume the test.');
    cy.pause();

    // After entering OTP manually, click the Verify button
    cy.get('.w-\\[296px\\]').click();

    // Check if the signup is successful (redirected to home page)
    cy.url().should('eq', Cypress.config().baseUrl + '/');


    // Optional: Log in to confirm the account works
    cy.get('.form-control').type('943327311');
    cy.get('#passwordInput').type("Ttes2@12345");
    cy.get('.mt-4 > .w-\\[353\\.04px\\]').click();

    cy.url().should('include', '/Dashboard');

    cy.get('.text-2xl').should('be.visible').and('contain', 'Dashboard')

    
  });

});
















// describe('User Sign-Up Flow', () => {

//   beforeEach(() => {
//     cy.visit('/');

//     cy.contains('Sign Up here').should('exist').click();
//     cy.url().should('include', '/signup');
//   });

//   it('should allow otp verification&signup', ()=> {
    
//     function fillSignupForm() {

//       // cy.intercept('POST', '/account/register', {
//       //   statusCode: 200, // Simulate success response
//       //   body: { message: "OTP sent successfully" },
//       // }).as('register');
    

//       // cy.intercept('POST', '/account/otp/verify-signup', (req) => {
//       //   if (req.body.otp === "123456" && req.body.phone === "251943327311") {
//       //     req.reply({
//       //       statusCode: 200,
//       //       body: { message: "OTP verified successfully" },
//       //     });
//       //   } else {
//       //     req.reply({
//       //       statusCode: 400,
//       //       body: { message: "Invalid OTP" },
//       //     });
//       //   }
//       // }).as('verifyOtp');
//       // Fill out the form and submit
//       cy.get('#firstName').should('be.visible').type("Asap");
//       cy.get('#nameInput').should('be.visible').type("asefa");
//       cy.get('.mt-\\[11px\\] > .relative > .w-\\[353\\.04px\\]').type('Ttes2@exam.com');
//       cy.get('#cName').should('be.visible').type("newcampp");
//       cy.get('#passwordInput').should('be.visible').type('Ttes2@12345');
//       cy.get('#confirmPasswordInput').should('be.visible').type('Ttes2@12345');
//       cy.get('.form-control').clear().should('be.visible').type('251943327311');
//       cy.get('.text-\\[13px\\]').click();
//       cy.contains('Merchant Service Agreement').should('exist');
//       cy.get('.primary_button').click()
//       cy.get('.flex-col.justify-center > .w-\\[353\\.04px\\]').click() // Click submit button
    
//       // Wait for the register request to complete
//       //cy.wait('@register');
    
//       //verify otp page display -Verify your phone number
//       cy.get('.modal-content', { timeout: 40000 }) // Waits up to 10 seconds for modal
//   .should('be.visible');
//       cy.get('.modal-content > .w-\\[371px\\] > .text-center').should('be.visible').contains('Verify your phone number')

//       // Simulate OTP input and verification
//       cy.get('.otp-input').each(($el, index) => {
//         cy.wrap($el).type('123456'[index]);
//       });
//       cy.get('.w-\\[296px\\]').click(); // Click verify button
    
  
    
//       // Assert that user is redirected or shown a success message
//       cy.url().should('include', '/');
//     }
    
//     fillSignupForm();

//     cy.get('.form-control').type(943327311)
//     cy.get('#passwordInput').type("Ttes2@12345")
//     cy.get('.mt-4 > .w-\\[353\\.04px\\]').click()

//     cy.get('.modal-content > .w-\\[371px\\] > .text-center').should('be.visible').contains('Verify your phone number')
    
//     cy.log('Manually enter the OTP and resume the test');
//     cy.pause(); // Execution stops here until you resume manually

//     cy.get('.w-\\[296px\\]').click()

//      cy.url().should('include', '/')

//   })
 
// });


