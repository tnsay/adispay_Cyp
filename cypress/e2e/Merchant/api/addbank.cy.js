describe ('it should allow user to add bank', () =>{

    beforeEach(() => {

    cy.loginmerchant("925609534", "Tina@1234"); 

    });

    it('navigate to bank and add bank',() =>{

        cy.visit('/');

        cy.get('[href="/Banks"]').click()

        cy.get('.w-\\[100\\%\\].flex-col > :nth-child(1) > .w-full').should('contain.text', 'Banks')      
          
          cy.get('.pl-\\[3\\%\\] > :nth-child(2) > .flex').click()
          cy.get('.fixed > .bg-white').should('be.visible').and('contain', 'Add New Bank')
          cy.get('.w-1\\/2.max-md\\:w-\\[100\\%\\] > .relative > .w-\\[294\\.5px\\]').type('FName LName')
          cy.get('.flex > .relative > .w-\\[294\\.5px\\]').type('3434353534')
        //   cy.get('.w-1\\/2.max-md\\:w-\\[80\\%\\] > .relative > .w-\\[294\\.5px\\]')
        //   .should('be.visible')
        //   .find('option')

        cy.get('.w-1\\/2.max-md\\:w-\\[80\\%\\] > .relative > .w-\\[294\\.5px\\]')
        .should('be.visible')
        .find('option') // Get all options inside the <select>
        .then(($options) => {
          const count = $options.length;
          const randomIndex = Math.floor(Math.random() * count); // Select a random index
          const randomValue = $options[randomIndex].value; // Get the value attribute of the random option
      
          cy.get('.w-1\\/2.max-md\\:w-\\[80\\%\\] > .relative > .w-\\[294\\.5px\\]')
            .select(randomValue); // Select the option by value
        });
        cy.get('.w-\\[300px\\]').type('newb')
      
        cy.get('.bg-\\[\\#00A16A\\]').then(($btn) => {
            cy.wrap($btn).should('be.visible').invoke('css', 'background-color').then((bgColor) => {
              if (bgColor === 'rgb(0, 161, 106)' || bgColor === 'rgba(0, 128, 0, 1)') { 
                cy.wrap($btn).click(); // Click if green
              } else {
                cy.log('Button is not green, skipping click');
              }
            });
          });
          cy.get('.bg-white > .h-\\[fit\\]').should('be.visible').and('contain', 'Bank added successfully, awaiting approval')
          cy.get('.my-5 > .text-center').click()
          
    })

    it('should be able to add primary bank'), () =>{
        cy.visit('/');

        cy.get('.flex-col > div.flex > .text-black').should('be.visible').and('contain', 'Primary Bank Account')

        cy.get('.bg-green-200').should('be.visible').click()
        const selectors = [
            ':nth-child(1) > .min-w-\\[25rem\\] > .flex > .text-\\[14px\\]',
            ':nth-child(2) > .min-w-\\[25rem\\] > .flex > .text-\\[14px\\]',
            ':nth-child(3) > .min-w-\\[25rem\\] > .flex > .text-\\[14px\\]'
          ];
          const randomSelector = selectors[Math.floor(Math.random() * selectors.length)];
          cy.get(randomSelector).click();

    }
})
