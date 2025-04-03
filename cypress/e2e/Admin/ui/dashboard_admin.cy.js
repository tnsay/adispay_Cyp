describe('Admin Dashboard and Navigation Tests', () => {
    beforeEach(() => {
        cy.visit('https://dev.admin.addispay.et/')
        cy.get('#phoneInput').type("admin@addispay.et")
        cy.get('#passwordInput').type('CU8O6q')

        cy.get(':nth-child(5) > .relative > .h-\\[51\\.5px\\]').select('Super Admin')
        cy.get('.mt-4 > .w-\\[353\\.04px\\]').click()  
        
    });

    it('verify merchants Section', () =>{

        cy.url().should('include', '/Dashboard') 
        cy.get('.\\32 xl\\:w-\\[100\\%\\] > :nth-child(1) > .text-\\[\\#00A16A\\]').should('have.attr', 'aria-selected', 'true');

     })

     it('verify Gateways Transaction report', () =>{

        

     })

     it('verify Withdrawal, Payout and Refund tabs', () =>{

       

     })

     it('verify Experience data', () =>{

        //checkout 
        //payment transaction 

     })

    



});