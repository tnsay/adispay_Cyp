describe('B2C Mpesa Payment API Tests', () => {

  const baseUrl = 'https://dev.api.addispay.et/checkout-api/v1/payment/direct-b2c';
  const headers = {
    Auth: 'ade3e5a8-199f-4432-83b7-ef70d51a239f'
  };
  const validPayload = {
    cancel_url: "https://example.com/cancel",
    success_url: "https://example.com/success",
    error_url: "https://example.com/error",
    order_reason: "Betting payment",
    currency: "ETB",
    customer_name: "John Doe",
    phone_number: "251743327311",
    nonce: crypto.randomUUID(),
    payment_method: "mpesa",
    total_amount: "200.00",
    tx_ref: crypto.randomUUID()
  };
  it('allows b2c payment with mpesa', () => {
    cy.request({
      method: 'POST',
      url: baseUrl,
      headers,
      timeout: 60000,
      body: {
        data: validPayload,
        message: "this a test direct payout"
        }            
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("The direct b2c payment has been processed successfully, The customer shall receive the paid amount.");
    });
  });

  it('should fail with unsupported phone number format', () => {
    const payload = { ...validPayload, phone_number: "251943327311" };
    cy.request({
      method: 'POST',
      url: baseUrl,
      headers,
      failOnStatusCode: false,
      body: {
        data: payload,
        message: "invalid phone number test"
      }
    }).then((response) => {
      expect(response.status).to.not.eq(200);
      expect(response.body.message).to.eq("The phone number you are using for this payment is not supported for this payment type. Please use a supported phone number.");
    });
  });

  it(' should fail with invalid payment method', () => {
     const payload = { ...validPayload, payment_method: "mpessssa", nonce: crypto.randomUUID(),
  tx_ref: crypto.randomUUID() };
    cy.request({
      method: 'POST',
      url: baseUrl,
      headers,
      failOnStatusCode: false,
      body: {
        data: payload,
        message: "invalid payment method test"
      }
    }).then((response) => {
      expect(response.status).to.not.eq(200);
      expect(response.body.details).to.contain("Payment Method Error: Invalid or unsupported payment method");
    });
  });

 it('should fail when required fields are missing', () => {
    const { phone_number, payment_method, nonce, tx_ref, ...partialPayload } = validPayload;
    cy.request({
      method: 'POST',
      url: baseUrl,
      headers,
      failOnStatusCode: false,
      body: { data: partialPayload, message: "missing fields test" }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.include("Missing required field");
    });
  });

  it('should fail with invalid amount (zero)', () => {
    const payload = { ...validPayload, total_amount: "0.00" };
    cy.request({
      method: 'POST',
      url: baseUrl,
      headers,
      failOnStatusCode: false,
      body: { data: payload, message: "zero amount test" }
    }).then((response) => {
      expect(response.status).to.not.eq(200);
      expect(JSON.stringify(response.body)).to.include("Invalid amount");
    });
  });

  it('should fail with duplicate tx_ref', () => {
    const duplicateTxRef = crypto.randomUUID();
    const payload = { ...validPayload, tx_ref: duplicateTxRef };

    // First request
    cy.request({
      method: 'POST',
      url: baseUrl,
      headers,
      body: { data: payload, message: "first submission" }
    }).then(() => {
      // Second request with same tx_ref
      cy.request({
        method: 'POST',
        url: baseUrl,
        headers,
        failOnStatusCode: false,
        body: { data: payload, message: "duplicate tx_ref test" }
      }).then((response) => {
        expect(response.status).to.eq(409);
        expect(JSON.stringify(response.body)).to.include("Duplicate transaction reference");
      });
    });
  });

  it('should reject resubmission of same payload (same nonce and tx_ref)', () => {
    const idempotentNonce = crypto.randomUUID();
    const idempotentTxRef = crypto.randomUUID();
    const payload = { ...validPayload, nonce: idempotentNonce, tx_ref: idempotentTxRef };

    cy.request({
      method: 'POST',
      url: baseUrl,
      headers,
      body: { data: payload, message: "first send" }
    }).then(() => {
      cy.request({
        method: 'POST',
        url: baseUrl,
        headers,
        failOnStatusCode: false,
        body: { data: payload, message: "resubmission test" }
      }).then((response) => {
        expect(response.status).to.eq(409);
      });
    });
  });

  it('should handle missing auth header', () => {
    cy.request({
      method: 'POST',
      url: baseUrl,
      failOnStatusCode: false,
      body: { data: validPayload, message: "missing auth header" }
    }).then((response) => {
      expect(response.status).to.be.oneOf([401, 403]);
    });
  });

  it('should reject request with extra unknown fields', () => {
    const payloadWithExtraField = { ...validPayload, fake_param: "test" };
    cy.request({
      method: 'POST',
      url: baseUrl,
      headers,
      failOnStatusCode: false,
      body: { data: payloadWithExtraField, message: "extra param test" }
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 422]);
    });
  });

});
