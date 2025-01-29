describe ('allows user to add bank', () =>{

    it('visit site',() =>{

        cy.visit('https://dev.dashboard.addispay.et/');
        cy.get('.form-control')

        cy.get('#passwordInput')
        
        //cy.get('#phoneInput').type('admin@addispay.et')
       // cy.get('#passwordInput').type('5D2Ark')

    })
})
