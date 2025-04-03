describe ('allows user to change to live mode within requirement ,qa', () =>{

    it('visit site',() =>{

        cy.visit('https://dev.dashboard.addispay.et/');
        
        cy.get('.form-control').type('943327311')
        cy.get('#passwordInput').type('Tina@12345')
        cy.get('.mt-4 > .w-\\[353\\.04px\\]').click()
        cy.url().should('include', '/Dashboard')  
        
        cy.get('.bg-\\[\\#00824F\\] > .bg-white').click()
        //cy.get('#phoneInput').type('admin@addispay.et')
       // cy.get('#passwordInput').type('5D2Ark')

    })
})
