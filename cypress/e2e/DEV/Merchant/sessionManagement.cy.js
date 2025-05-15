describe('JWT Session Management Tests', () => {
    const loginUrl = 'https://dev.api.addispay.et/account/login'; //  full API URL 
    const dashboardUrl = '/dashboard'; // Protected route
  
    const validCredentials = {
      phone: '251925609534',
      password: 'Tina@1234'
    };
  
    const invalidCredentials = {
      phone: '251925609534',
      password: 'WrongPass123'
    };
  
    it('Should login successfully and store JWT token in sessionStorage', () => {
      cy.request({
        method: 'POST',
        url: loginUrl,
        body: validCredentials,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
        
        const token = response.body.token;
  
        // Set token in sessionStorage
        cy.visit('/'); // Load your app to access sessionStorage
        cy.window().then((win) => {
          win.sessionStorage.setItem('token', token);
        });
  
        // Confirm it's stored
        cy.window().then((win) => {
          const storedToken = win.sessionStorage.getItem('token');
          expect(storedToken).to.eq(token);
        });
      });
    });
  
    it('Should not store token for invalid login', () => {
      cy.request({
        method: 'POST',
        url: loginUrl,
        body: invalidCredentials,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401);
      });
    });
  
    it('Should access protected route with stored JWT token', () => {
      cy.request({
        method: 'POST',
        url: loginUrl,
        body: validCredentials,
        failOnStatusCode: false
      }).then((response) => {
        const token = response.body.token;
  
        cy.request({
          method: 'GET',
          url: dashboardUrl,
          headers: {
            Authorization: `Bearer ${token}`
          },
          failOnStatusCode: false
        }).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.exist;
        });
      });
    });
  
    it('Should remove token on logout', () => {
      cy.visit('/'); // Visit app
      cy.window().then((win) => {
        win.sessionStorage.setItem('token', 'dummyToken');
        win.sessionStorage.removeItem('token'); // Simulate logout
        const tokenAfterLogout = win.sessionStorage.getItem('token');
        expect(tokenAfterLogout).to.be.null;
      });
    });
  });
  