/// <reference types = "cypress" />

describe ('Dashboard Navigation', () =>{
    before(() => {
        cy.visit('https://dev.dashboard.addispay.et')
        cy.get('.form-control').type('943327311')
        cy.get('#passwordInput').type('Tina@1234')
        cy.get('.mt-4 > .w-\\[353\\.04px\\]').click()
        cy.url().should('include', '/Dashboard')  
        
        // cy.getCookies().then((cookies) => {
        //     cy.log(cookies); // Log all cookies to ensure session is maintained
        //   });
          
    });

    
    it('updates business profile' ,() => {

    });

    it('Should navigate to Banks tab and verify content', () => {
   
      //cy.visit('https://dev.dashboard.addispay.et/Banks'); 

    });

    
  });




    // it('Should click on "Add New Bank" and verify navigation', () => {
    //   cy.contains('Add New Bank').click();
  
    //   // Verify navigation or popup
    //   cy.url().should('include', '/add-bank'); // Update URL if redirected
    //   cy.contains('Add Bank Form').should('be.visible'); // Update with actual form heading or element
    // });

     
    // it('Should interact with the primary bank account dropdown', () => {
    //     // Select primary bank account dropdown
    //     cy.contains('select primary bank account').click();
    
    //     // Example: Selecting the first option (replace with actual options logic if needed)
    //     cy.get('.dropdown-menu') // Update selector based on the actual dropdown class
    //       .find('li')
    //       .first()
    //       .click();
    //   });
  
    // it('Should use the search bar to find a bank', () => {
    //   // Type in the search bar
    //   cy.get('input[placeholder="Search by holder name, account number..."]')
    //     .type('Test Bank')
    //     .should('have.value', 'Test Bank');
  
    //   // Validate results
    //   cy.get('table tbody tr').should('have.length.greaterThan', 0); // Ensure results appear
    // });
  
    // it('Should export data using CSV and PDF buttons', () => {
    //   // Click on CSV export
    //   cy.get('.fa-file-csv').click();
    //   cy.readFile('cypress/downloads/export.csv').should('exist'); // Validate file download
  
    //   // Click on PDF export
    //   cy.get('.fa-file-pdf').click();
    //   cy.readFile('cypress/downloads/export.pdf').should('exist'); // Validate file download
    // });
  
    // it('Should verify table contents', () => {
    //   // Check table headers
    //   cy.get('table thead th')
    //     .should('contain.text', 'No')
    //     .and('contain.text', 'Bank Name')
    //     .and('contain.text', 'Holder Name')
    //     .and('contain.text', 'Account Number')
    //     .and('contain.text', 'Total Transfers')
    //     .and('contain.text', 'Status')
    //     .and('contain.text', 'Action');
  
    //   // Validate the table is initially empty
    //   cy.get('table tbody tr').should('have.length', 0);
    // });



