describe('Dashboard and Navigation Tests', () => {
    beforeEach(() => {
        // Visit the dashboard page
        cy.visit('/'); // 

        // Ensure user is logged in (if needed)
       // cy.loginmerchant("925609534", "Tina@1234"); 
       
        cy.get('.form-control').type(925609534)
        cy.get('#passwordInput').type("Tina@1234")
        cy.get('.mt-4 > .w-\\[353\\.04px\\]').click()
        cy.url().should('include', '/Dashboard')
    });

   it('Validates dashboard data display', () => {
    cy.get('.justify-between > .MuiTabs-root > .MuiTabs-scroller > .MuiTabs-flexContainer > .Mui-selected').should('be.visible').and('contain', 'Overview')
    cy.get(':nth-child(1) > .gap-4 > .data > .font-semibold').should('contain', 'Total Transactions');
    cy.get(':nth-child(2) > .gap-4 > .data > .font-semibold').should('contain', 'Total Payout');
    cy.get(':nth-child(3) > .gap-4 > .data > .font-semibold').should('contain', 'Total refund');
    //cy.get(':nth-child(8) > .gap-4 > .data > .font-semibold').should('contain', 'Total Withdrawal');
    cy.get(':nth-child(8) > .gap-4 > .data > .font-semibold').should('contain', 'Available balance');

        cy.get(':nth-child(1) > .gap-4 > .data > .font-semibold').should('contain', 'Total Transactions').next()
            .invoke('text')
            .then(parseFloat)
            .should('be.greaterThan', 0);
    });



    it('Validates transactions chart is displayed', () => {
    //         cy.get('.gap-\\[15px\\] > :nth-child(1) > .bg-white').should('be.visible')
    //         cy.get('.MuiCardContent-root > :nth-child(1) > .text-center').should('be.visible').and('contain', 'Transactions')

    //    // Step 1: Get colors of pie chart sections
    // cy.get('svg path.MuiPieArc-root')
    // .then(($paths) => {
    //   const chartColors = [...$paths].map(el => el.style.fill); 

    //   // Step 2: Get colors and values from the legend
    //   cy.get('.max-xl\\:justify-between > .text-\\[\\#72777B\\]')
    //     .then(($legendItems) => {
    //       const legendColors = [...$legendItems].map(el =>
    //         window.getComputedStyle(el).backgroundColor // Get legend color
    //       );

    //       // Step 3: Compare pie chart colors with legend colors
    //       expect(chartColors.sort()).to.deep.equal(legendColors.sort());
    //     });

    //   // Step 4: Verify that legend numbers sum to 100% (if needed)
    //   cy.get('.px-3 font-bold .value') // Replace with the class for numbers
    //     .then(($values) => {
    //       const total = [...$values].reduce((sum, el) => sum + parseFloat(el.innerText || '0'), 0);
    //       expect(total).to.equal(100); // Ensure total is 100%

     //    });

    });
    });
    
    it('Validates Alltransaction section display trnx data', () => {
        // cy.get('.MuiCardContent-root > .justify-between').should('be.visible').and('contain', 'All Transactions')
        // cy.get('.MuiTabs-flexContainer > .Mui-selected')
        //   .should('have.attr', 'aria-selected', 'true');
        // cy.get('table.w-full > tbody > :nth-child(2) > :nth-child(2)').invoke('text') 
        // .then((text) => {
        //   const amount = parseFloat(text.replace(/[^0-9.-]+/g, '')); 
        //   cy.log('Parsed Amount:', amount);
        //   expect(amount).to.be.greaterThan(0); // Ensure value > 0
        // });

        // cy.get('table.w-full > tbody > :nth-child(2) > :nth-child(3)').invoke('text') 
        // .then((text) => {
        //   const amount = parseFloat(text.replace(/[^0-9.-]+/g, '')); 
        //   cy.log('Parsed Amount:', amount);
        //   expect(amount).to.be.greaterThan(0); // Ensure value > 0
        // });


    });

    it('Validates Activities section', () => {
    cy.get('.grid > [style="background: rgb(255, 255, 255);"]').should('be.visible')
    cy.get('.grid > [style="background: rgb(255, 255, 255);"] > :nth-child(1) > :nth-child(1) > :nth-child(1)').contains ('Activities')
    cy.get('.MuiTabs-flexContainer > .Mui-selected')
    .should('have.attr', 'aria-selected', 'true');



    });
    it('Verify Transaction amounts chart', () => {
    cy.get('.w-\\[98\\%\\] > .grid > .rounded-md').should('be.visible').and('contain', 'Transaction Amounts')


    });

    it('Verify Experience', () => {
      cy.get('.justify-between > .MuiTabs-root > .MuiTabs-scroller > .MuiTabs-flexContainer > [tabindex="-1"] > .text-\\[14px\\]').click()
      it('Validates all rows in the Payment section', () => {
        cy.get('a').contains('Payment').click();
        
        cy.get('table').within(() => {
            cy.get('tr').each(($row, index) => {
                if (index > 0) { // Skipping header row
                    cy.wrap($row).within(() => {
                        cy.get('td').eq(0).should('not.be.empty'); // Transaction ID
                        cy.get('td').eq(1).should('not.be.empty'); // Customer Name
                        cy.get('td').eq(2).should('not.be.empty'); // Transaction Date
                        cy.get('td').eq(3).should('not.be.empty'); // Payment Method
                        cy.get('td').eq(4).should('not.be.empty'); // Operation
                        cy.get('td').eq(5).should('not.be.empty'); // Third Party Txn Ref
                        cy.get('td').eq(6).should('not.be.empty'); // Credit/Debit
                        cy.get('td').eq(7).should('not.be.empty'); // Customer Account
                        cy.get('td').eq(8).should('not.be.empty'); // Payment Status
                        cy.get('td').eq(9).should('not.be.empty'); // Message
                        cy.get('td').eq(10).should('not.be.empty'); // Status Code
                    });
                }
            });
        });
    });

    it('Validates all rows in the Callback section', () => {
        cy.get('a').contains('Callback').click();
        
        cy.get('table').within(() => {
            cy.get('tr').each(($row, index) => {
                if (index > 0) { // Skipping header row
                    cy.wrap($row).within(() => {
                        cy.get('td').eq(0).should('not.be.empty'); // Merchant ID
                        cy.get('td').eq(1).should('not.be.empty'); // Session UUID
                        cy.get('td').eq(2).should('not.be.empty'); // Addispay Transaction ID
                        cy.get('td').eq(3).should('not.be.empty'); // Total Amount
                        cy.get('td').eq(4).should('contain.text', 'Success'); // Payment Status
                        cy.get('td').eq(5).should('not.be.empty'); // Status Code
                        cy.get('td').eq(6).should('not.be.empty'); // URL
                        cy.get('td').eq(7).should('not.be.empty'); // Trials
                    });
                }
            });
        });


    })




});