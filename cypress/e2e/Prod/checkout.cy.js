///<reference types = "cypress" >
import { faker } from '@faker-js/faker';

describe('Automate Addispay Checkout', () => {
  it('Creates an order and visits the payment page', () => {

    const startTime = Date.now();
    cy.request({
      method: 'POST',
      url: 'https://api.addispay.et/checkout-api/v1/create-order',
      headers: {
          //Auth: '5b22e8b9-15be-46b3-b73a-0fbde67ba9e8'
          Auth: '0f7f3687-ce5a-41aa-98a1-b6ec5bdd8bee'
            },
      timeout: 60000,
      body: {
        data: {
          cancel_url: "https://webhook.site/1c0dca02-643d-45a8-8074-a03f70376d34",
          success_url: "https://webhook.site/1c0dca02-643d-45a8-8074-a03f70376d34",
          error_url: "https://webhook.site/1c0dca02-643d-45a8-8074-a03f70376d34",
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
    const endTime = Date.now();  // ⏱️ Stop timer
    const durationInSeconds = ((endTime - startTime) / 1000).toFixed(2);
    cy.log('✅ Payment success message appeared within 5 minutes');

    cy.log(`🕒 Total checkout time: ${durationInSeconds} seconds`);
console.log(`🕒 Total checkout time: ${durationInSeconds} seconds`);
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
