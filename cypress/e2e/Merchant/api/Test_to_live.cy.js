describe ('allows user to change to live mode within requirement ,qa', () =>{
    beforeEach(() => {
        // Visit the dashboard page
        cy.visit('/'); // 

        // Ensure user is logged in (if needed)
       cy.loginmerchant("925609534", "Tina@1234"); 
    })

    it('visit site',() =>{

        cy.visit('/');
        cy.url().should('include', '/Dashboard')  
    })

    it('should allow user to fill Business profile form and Key(optional) to request live', () => {
        cy.visit('/')
        cy.get('.bg-\\[\\#00824F\\] > .bg-white').click()
        cy.get(':nth-child(1) > :nth-child(1) > .relative > #nameInput').invoke('val').should('not.be.empty')
        const randomNineDigitNumber = Math.floor(100000000 + Math.random() * 900000000);
        cy.get(':nth-child(1) > :nth-child(3) > .relative > #nameInput').clear().type(randomNineDigitNumber.toString())

        const options = [
            'Retail Services',
            'Financial Services',
            'Hospitality and Travel',
            'Utilities and Government',
            'Entertainment and Leisure',
            'E-commerce and Digital Goods'
          ];
          
          const randomOption = options[Math.floor(Math.random() * options.length)];
          
          // Select a random category from the dropdown
          cy.get('#options').select(randomOption);
          
          cy.get('.p-2 > .gap-2 > :nth-child(1)').click()
          cy.get(':nth-child(5) > .bg-white > .flex-col').should('be.visible').and('contain', 'Merchant registration details updated successfully')
          cy.get('.flex-col > .h-full').click()
          cy.get('.gap-8 > :nth-child(2) > .bg-\\[\\#00824F\\]').click()
          cy.get('.h-\\[80px\\] > .fixed > .ml-6 > .text-\\[15px\\]').should('be.visible').and('contain', 'Upload your legal business documents to be eligible for actual transaction')

          const options2 = [
              'National ID Card',
              'Passport',
              'Driver License',
              'Kebele ID',
            ];
          const randomOption2 = options2[Math.floor(Math.random() * options2.length)];
          cy.get('div.w-full > #options').select(randomOption2)
          //add file

          const fileTypes = [
            { ext: 'pdf', mime: 'application/pdf' },
            { ext: 'jpg', mime: 'image/jpeg' },
            { ext: 'png', mime: 'image/png' }
          ];
        
          // Randomly select a file type
          const randomType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
          const dummyContent = 'Dummy file content for testing';
        
          // Create a Blob and upload to both selectors
          const fileName = `dummy-file.${randomType.ext}`;
        
        // Write file to fixtures folder
            cy.writeFile(`cypress/fixtures/${fileName}`, dummyContent).then(() => {
        
            // Upload to 1st input
            cy.get(':nth-child(2) > .gap-2 > .relative > .inset-0').attachFile({
              filePath: fileName,
              fileName: fileName,
              mimeType: randomType.mime
            });
        
            // Upload to 2nd input
            cy.get(':nth-child(4) > .gap-2 > .relative > .inset-0').attachFile({
              filePath: fileName,
              fileName: fileName,
              mimeType: randomType.mime
            });

            cy.get(':nth-child(5) > .gap-2 > .relative > .inset-0').attachFile({
                filePath: fileName,
                fileName: fileName,
                mimeType: randomType.mime
              });
            cy.get('.h-\\[80px\\] > .p-6 > .gap-8 > :nth-child(2) > .bg-\\[\\#00824F\\]').click()

            cy.get(':nth-child(7) > .bg-white > .flex-col')
            .should('be.visible')
            .within(() => {
              cy.get('.my-5 > .text-center')
                .should('be.visible')
                .and('contain', 'Legal Documents Uploaded successfully');
            });          
            cy.get('.flex-col > .h-full').click()
            

      })
    


      
    })

  
    })
