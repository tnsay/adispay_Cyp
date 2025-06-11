describe('B2C telebirr Payment API Tests', () => {

  const baseUrl = 'https://dev.api.addispay.et/checkout-api/v1/payment/direct-b2c';
  const headers = {
    Auth: '705aa188-c2a4-4e4e-97e0-52af40ad2342'
  };

  it('✅ allows b2c payment with telebirr', () => {
    cy.request({
      method: 'POST',
      url: baseUrl,
      headers,
      timeout: 60000,
      body: {
        data: {
          cancel_url: "https://example.com/cancel",
          success_url: "https://example.com/success",
          error_url: "https://example.com/error",
          order_reason: "Betting payment",
          currency: "ETB",
          customer_name: "John Doe",
          phone_number: "251943327311",
          nonce: crypto.randomUUID(),
          payment_method: "telebirr",
          total_amount: "2.00",
          tx_ref: crypto.randomUUID()
        },
        message: "this a test direct payout"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("The direct b2c payment has been processed successfully, The customer shall receive the paid amount.");
    });
  });

  it(' should fail with unsupported phone number format', () => {
    cy.request({
      method: 'POST',
      url: baseUrl,
      headers,
      failOnStatusCode: false,
      body: {
        data: {
          cancel_url: "https://example.com/cancel",
          success_url: "https://example.com/success",
          error_url: "https://example.com/error",
          order_reason: "Invalid phone number test",
          currency: "ETB",
          customer_name: "Jane Doe",
          phone_number: "251743327311", // Unsupported prefix
          nonce: crypto.randomUUID(),
          payment_method: "telebirr",
          total_amount: "2.00",
          tx_ref: crypto.randomUUID()
        },
        message: "invalid phone number test"
      }
    }).then((response) => {
      expect(response.status).to.not.eq(200);
      expect(response.body.message).to.eq("The phone number you are using for this payment is not supported for this payment type. Please use a supported phone number.");
    });
  });

  it(' should fail with invalid payment method', () => {
    cy.request({
      method: 'POST',
      url: baseUrl,
      headers,
      failOnStatusCode: false,
      body: {
        data: {
          cancel_url: "https://example.com/cancel",
          success_url: "https://example.com/success",
          error_url: "https://example.com/error",
          order_reason: "Invalid payment method test",
          currency: "ETB",
          customer_name: "Jake Doe",
          phone_number: "251943327311",
          nonce: crypto.randomUUID(),
          payment_method: "mpessa", 
          total_amount: "2.00",
          tx_ref: crypto.randomUUID()
        },
        message: "invalid payment method test"
      }
    }).then((response) => {
      expect(response.status).to.not.eq(200);
      expect(response.body.details).to.contain("Payment Method Error: Invalid or unsupported payment method");
    });
  });

});
