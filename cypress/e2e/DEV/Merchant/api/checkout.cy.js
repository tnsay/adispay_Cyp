///<reference types = "cypress" >
import { faker } from '@faker-js/faker';

describe('Automate Addispay Checkout', () => {
  it('Creates an order and visits the payment page', () => {
    cy.request({
      method: 'POST',
      url: 'https://api.addispay.et/checkout-api/v1/create-order',
      headers: {
          Auth: 'e0445249-ab9f-4790-b4bc-7940da7bb594'
            },
      timeout: 60000,
      body: {
        data: {
          cancel_url: "https://webhook.site/7ac4478d-d893-4dd9-9921-b22898e017ee",
          success_url: "https://webhook.site/7ac4478d-d893-4dd9-9921-b22898e017ee",
          error_url: "https://webhook.site/7ac4478d-d893-4dd9-9921-b22898e017ee",
          currency: "ETB",
          email: "random@example.com",
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          nonce: crypto.randomUUID(),
          order_detail: {
            amount: 1.00,
            description: "this is the t-shirt I ordered"
          },
          phone_number: "251943327311",
          session_expired: "5000",
          total_amount: "1.00",
          tx_ref: crypto.randomUUID()
        },
        message: "all in all good experience"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      const uuid = response.body.uuid;
      const checkoutUrl = `${response.body.checkout_url}/${uuid}`;
      cy.visit(checkoutUrl);

      // Simulate payment method selection
       cy.contains('telebirr').click()

      cy.get('.gap-4 > .gap-8').click()
      
     cy.contains('.fixed > .bg-white', 'You have successfully make payment', { timeout: 300000 })
  .should('be.visible')
  .then(() => {
    cy.log('✅ Payment success message appeared within 5 minutes');
  });

      cy.get('.px-4').contains('Show Receipt').click()
      cy.get('.receipt__content').should('exist')
      //verify reciept content non empty

      cy.get('.receipt__content').within(() => {
        cy.get('table tbody tr').as('rows');

        const expectedFields = [
          'merchant',
          'payment Date',
          'payment reference',
          'Amount',
          'Status'
        ];
        expectedFields.forEach((label, index) => {
        cy.get('@rows').eq(index).within(() => {
          // Check the label on the left
          cy.get('td').eq(0).should('contain.text', label);

          // Ensure the value on the right is not empty
          cy.get('td').eq(1).invoke('text').should('match', /\S+/);
          });
        });
        });
        
    });
  });

});
