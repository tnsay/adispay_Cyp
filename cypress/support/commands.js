// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('loginmerchant', (phone, password)=>
{

    cy.session([phone, password], ()=>{

        cy.visit('/')
        cy.get('.form-control').type(phone)
        cy.get('#passwordInput').type(password)
        cy.get('.mt-4 > .w-\\[353\\.04px\\]').click()
        cy.url().should('include', '/Dashboard')  
    }, {
        cacheAcrossSpecs: true
    }
)
   
})


Cypress.Commands.add('loginadmin', (email, password)=>
    {
    
        cy.session([email, password], ()=>{
    
            cy.visit('/https://dev.admin.addispay.et/')
            cy.get('#phoneInput').type("admin@addispay.et")
            cy.get('#passwordInput').type('CU806q')
            cy.get('select[name="Super Admin"]').select('Super Admin').click()

            
            cy.url().should('include', '/Dashboard')  
        }, {
            cacheAcrossSpecs: true
        }
    )
       
    })


//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })