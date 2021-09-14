// This command gets the watchList items, get the page, waits, then grabs it again and does a check to 
// see if anything changed. It goes through and iterates 3 sets of checks per watchList item 
// to see if anything has changed on the page within the wait time frame. 

Cypress.Commands.add('checkWatchList', (watchList) => {
    var genArr = Array.from({length:3},(v,k)=>k+1)
    cy.wrap(genArr).each((index1) =>{
        var arr2 = Array.from({length:watchList.length},(a,b) => b+1)
        cy.wrap(arr2).each((index) =>{
            cy.log('Iteration: ' + index1)
            let content1,content2;
            
            cy.request(watchList[index-1]).its('body').should(($div) => {
                content1 = $div; //Get page 1st time
            })
            .then(()=> {
                cy.wait(20000); //wait for some time to grab page again
            })
            cy.request(watchList[index-1]).its('body').should(($div) => {
                content2 = $div;  //Get page 2nd time        
            })
            .then(()=>{ //Perform check to see if page changed
                if(content1 == content2){
                    cy.log('No changes!')
                }else if(content1 != content2)
                {
                    cy.log('Page changed!')                                  
                }
            })

        })
    })

})

