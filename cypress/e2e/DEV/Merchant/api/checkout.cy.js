///<reference types = "cypress" >
import { faker } from '@faker-js/faker';

describe('Automate Addispay Checkout', () => {
  it('Creates an order and visits the payment page', () => {
    cy.request({
      method: 'POST',
      url: 'https://dev.api.addispay.et/checkout-api/v1/create-order',
      headers: {
          //Auth: '5b22e8b9-15be-46b3-b73a-0fbde67ba9e8'
          Auth: 'ade3e5a8-199f-4432-83b7-ef70d51a239f'
            },
      timeout: 60000,
      body: {
        data: {
          cancel_url: "https://webhook.site/a5cffe4f-217c-4b9c-8da9-157b58ad9b9c",
          success_url: "https://webhook.site/a5cffe4f-217c-4b9c-8da9-157b58ad9b9c",
          error_url: "https://webhook.site/a5cffe4f-217c-4b9c-8da9-157b58ad9b9c",
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
