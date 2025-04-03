describe ('allows user to add bank', () =>{

    beforeEach(() => {

    cy.loginmerchant("925609534", "Tina@1234"); 

    });

    it('navigate to bank and add',() =>{

        cy.visit('/');

        cy.get('[href="/Banks"]').click()

        cy.get('.w-\\[100\\%\\].flex-col > :nth-child(1) > .w-full').should('contain.text', 'Banks')
        cy.get(':nth-child(3) > .min-w-\[25rem\] > .flex > .text-\[14px\]')

        cy.get('.bg-green-200').should('be.visible').click()


        //cy.get('#phoneInput').type('admin@addispay.et')
       // cy.get('#passwordInput').type('5D2Ark')

    })
})
