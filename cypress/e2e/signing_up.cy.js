// 
/// <reference types="cypress" />

describe('User Sign-Up Flow', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.contains('Sign Up here').should('exist').click();
    cy.url().should('include', '/signup');
  });

  it('should allow otp verification&signup', ()=> {
    function fillSignupForm() {

      // cy.intercept('POST', '/account/register', {
      //   statusCode: 200, // Simulate success response
      //   body: { message: "OTP sent successfully" },
      // }).as('register');
    

      cy.intercept('POST', '/account/otp/verify-signup', (req) => {
        if (req.body.otp === "123456" && req.body.phone === "251912122543") {
          req.reply({
            statusCode: 200,
            body: { message: "OTP verified successfully" },
          });
        } else {
          req.reply({
            statusCode: 400,
            body: { message: "Invalid OTP" },
          });
        }
      }).as('verifyOtp');
      // Fill out the form and submit
      cy.get('#firstName').should('be.visible').type("TG");
      cy.get('#nameInput').should('be.visible').type("asefa");
      cy.get('.mt-\\[11px\\] > .relative > .w-\\[353\\.04px\\]').type('tes2@exam.com');
      cy.get('#cName').should('be.visible').type("newcampp");
      cy.get('#passwordInput').should('be.visible').type('Tt@12345');
      cy.get('#confirmPasswordInput').should('be.visible').type('Tt@12345');
      cy.get('.form-control').clear().should('be.visible').type('251912122543');
      cy.get('.text-\\[13px\\]').click();
      cy.contains('Merchant Service Agreement').should('exist');
      cy.get('.primary_button').click()
      cy.get('.flex-col.justify-center > .w-\\[353\\.04px\\]').click() // Click submit button
    
      // Wait for the register request to complete
      //cy.wait('@register');
    
      //verify otp page display -Verify your phone number
      cy.get('.modal-content', { timeout: 40000 }) // Waits up to 10 seconds for modal
  .should('be.visible');
      cy.get('.modal-content > .w-\\[371px\\] > .text-center').should('be.visible').contains('Verify your phone number')

      // Simulate OTP input and verification
      cy.get('.otp-input').each(($el, index) => {
        cy.wrap($el).type('123456'[index]); // Type each digit in sequence
      });
      cy.get('.w-\\[296px\\]').click(); // Click verify button
    
  
    
      // Assert that user is redirected or shown a success message
      cy.url().should('include', '/');
    }
    
    fillSignupForm();
  })
 
  

});

// Helper function to fill the sign-up form
// function fillSignupForm() {
//   cy.get('#firstName').type("TG");
//   cy.get('#nameInput').type("asefa");
//   cy.get('.mt-\\[11px\\] > .relative > .w-\\[353\\.04px\\]').type('test13@exam.com');
//   cy.get('#cName').type("newcampp");
//   cy.get('#passwordInput').type('Tt@12345');
//   cy.get('#confirmPasswordInput').type('Tt@12345');
//   cy.get('.form-control').clear().type('251912122520');
//   cy.get('.text-\\[13px\\]').click();
//   cy.contains('Merchant Service Agreement').should('exist');
//   cy.get('.primary_button').click();
// }
