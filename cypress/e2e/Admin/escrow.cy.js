
/// <reference types = "cypress" />

describe ('Escrow service setting should work in admin', () =>{

    it('allows user to add contract',() =>{

        cy.visit('https://dev.admin.addispay.et/');

        cy.get('#phoneInput').type('admin@addispay.et')
        cy.get('#passwordInput').type('5D2Ark')
        
        cy.get('.mt-4 > .w-\\[353\\.04px\\]').click()

        cy.get('[href="/escrow"]').should('be.visible').click()

       // cy.get('.tabs > :nth-child(4)').click()

       cy.get('.w-\\[calc\\(100\\%-220px\\)\\] > .justify-between')
       .should('be.visible')
       .find('.tabs > :nth-child(4)') 
       .click();     //type issue https://fonts.googleapis.com/css2?family=SF+Pro&display=swap

       cy.reload();  //refresh
       cy.get('.tabs > :nth-child(3)').click()


    })


})
       
//         cy.get('.rsw-ce h1:nth-of-type(13) p:nth-of-type(3)')
//   .should('be.visible')
  //.type('..........');

      
        //cy.get('.mt-4 > .w-full').click()

        //cy.get('text-xl font-bold mt-2  text-center').should('contain.text', 'Escrow contract created successfully')


    



