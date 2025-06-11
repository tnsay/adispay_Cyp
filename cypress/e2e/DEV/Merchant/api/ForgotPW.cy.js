describe(('Forget password'),()=>{
 const randomPhoneNumber = Math.floor(100000000 + Math.random() * 900000000).toString();

it('verify forgot password', () =>{
    cy.visit('/')
    cy.contains('Forget Password ?').should('exist')
    cy.get('.text-right > .cursor-pointer').click()
    //cy.url().should('include', '/signup')
    cy.get('.text-\\[\\#1E211D\\]').should('contain.text', 'Your Phone Number')
    cy.get('.overflow-hidden > .react-tel-input > .form-control').type('943327311')
    cy.get('.bg-\\[\\#00824F\\]').click()
    cy.get('.modal-content > .w-\\[371px\\] > .text-center').should('contain.text', 'Verify your phone number')

    cy.log('Manually enter the OTP and resume the test');
    cy.pause(); // Execution stops here until you resume manually

    cy.get('.w-\\[296px\\]').click(); //for the Verify button
      
    cy.contains('New Password').should('exist')



    cy.get('#passwordInput1').type('Tina@12345')
    cy.get('#passwordInput2').type('Tina@12345')
    cy.get('.bg-\\[\\#00824F\\]').click()
    cy.contains('Password changed successfully').should('be.visible');
    cy.get('.bg-white > .flex-col > .h-full').click()
    
  })

  //add wrong otp and existing pw again
it('foget PW fails on unexisting phone number',()=>{


 cy.visit('/')
  cy.contains('Forget Password ?').should('exist')
    cy.get('.text-right > .cursor-pointer').click()
     cy.get('.text-\\[\\#1E211D\\]').should('contain.text', 'Your Phone Number')
    cy.get('.overflow-hidden > .react-tel-input > .form-control').type(randomPhoneNumber)
    cy.get('.bg-\\[\\#00824F\\]').click()
    cy.get(':nth-child(3) > .bg-white > .flex-col').should('be.visible').contains('User not found')

})


});

