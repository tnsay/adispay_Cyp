// 

/// <reference types="cypress" />

describe('User Sign-Up Flow', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.contains('Sign Up here').should('exist').click();
    cy.url().should('include', '/signup');
  });

  it('should allow users to sign up and verify OTP', () => {
    fillSignupForm();

    // Mock registration API response
    cy.intercept('POST', '/account/register', {
      statusCode: 200,
      body: { success: true },
    }).as('register');

    // Click Sign Up button only if it's enabled
    cy.get('.flex-col.justify-center > .w-\\[353\\.04px\\]').then(($button) => {
      const isDisabled = $button.prop('disabled');
      if (isDisabled) {
        cy.log('Form not completed properly! Please check required fields.');
        return;
      }
      cy.wrap($button).click();
    });

    cy.wait('@register'); // Wait for the registration request to finish

    // Mock OTP response from Twilio API
    const mockOTP = '123456';
    cy.intercept('POST', 'https://api.twilio.com/2010-04-01/Accounts/*/Messages.json', {
      statusCode: 201,
      body: {
        sid: 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        status: 'queued',
        to: '251912122520',
        from: '+1987654321',
        body: `Your OTP is ${mockOTP}`,
      },
      headers: {
        'Access-Control-Allow-Origin': '*', // Add CORS headers to allow the request
      },
    }).as('twilioSms');

    // Wait for the OTP API response
    cy.wait('@twilioSms').then(() => {
      // Verify OTP modal appears after the OTP response
      cy.contains('Verify your phone number').should('be.visible');
      
      // Verify API request contains the correct OTP
      cy.wait('@twilioSms').its('request.body').then((body) => {
        expect(body.to).to.equal('251912122520');
        expect(body.body).to.include(mockOTP);
      });

      // Enter OTP dynamically
      cy.get('.modal-content > :nth-child(3) > .flex').type(mockOTP);

      // Click verify button to complete registration
      cy.get('.w-\\[296px\\]').click();
    });

    // Validate successful sign-up
    cy.contains('Welcome Back!').should('be.visible');
  });

});

// Helper function to fill the sign-up form
function fillSignupForm() {
  cy.get('#firstName').type("TG");
  cy.get('#nameInput').type("asefa");
  cy.get('.mt-\\[11px\\] > .relative > .w-\\[353\\.04px\\]').type('test13@exam.com');
  cy.get('#cName').type("newcampp");
  cy.get('#passwordInput').type('Tt@12345');
  cy.get('#confirmPasswordInput').type('Tt@12345');
  cy.get('.form-control').clear().type('251912122520');
  cy.get('.text-\\[13px\\]').click();
  cy.contains('Merchant Service Agreement').should('exist');
  cy.get('.primary_button').click();
}
