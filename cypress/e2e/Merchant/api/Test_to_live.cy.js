describe ('allows user to change to live mode within requirement ,qa', () =>{
    beforeEach(() => {
        // Visit the dashboard page
        cy.visit('/'); // 

        // Ensure user is logged in (if needed)
       cy.loginmerchant("925609534", "Tina@1234"); 
    })

    it('visit site',() =>{

        cy.visit('/');
        cy.url().should('include', '/Dashboard')  
    })

    it('should allow user to fill form and request live', () => {
        cy.visit('/')
        cy.get('.bg-\\[\\#00824F\\] > .bg-white').click()
        cy.get(':nth-child(1) > :nth-child(1) > .relative > #nameInput').invoke('val').should('not.be.empty')
        cy.get(':nth-child(1) > :nth-child(3) > .relative > #nameInput').type("123456789")
        cy.get(':nth-child(1) > :nth-child(5) > .relative').click()
        const selectors = [
            ':nth-child(1) > .min-w-\\[25rem\\] > .flex > .text-\\[14px\\]',
            ':nth-child(2) > .min-w-\\[25rem\\] > .flex > .text-\\[14px\\]',
            ':nth-child(3) > .min-w-\\[25rem\\] > .flex > .text-\\[14px\\]'
          ];
          const randomSelector = selectors[Math.floor(Math.random() * selectors.length)];
          cy.get(randomSelector).click();
    })
})
