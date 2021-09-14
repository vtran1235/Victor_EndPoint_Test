// This test adds two wikipedia urls to an array and passes it through a custom command that checks
// to see if anything changes in the pages with an allotted amount of time. Then it removes the first element
// of the array, does a check. Then goes to the page and does a title check. 
describe('Endpoint Wikipedia Test', () => {
    it('wiki check', () => {
        let watchList = []
        watchList.push('https://en.wikipedia.org/wiki/California')
        watchList.push('https://en.wikipedia.org/wiki/LinkedIn')
        cy.checkWatchList(watchList) // iterate through three sets of checks per item in watchList 
        .then(()=>{
            watchList.shift()//removes first element from list
            expect(watchList[0]).equals('https://en.wikipedia.org/wiki/LinkedIn')//second item still there
            expect(watchList.length).equals(1)
    
            cy.visit(watchList[0])//visit first element in list
            cy.url().should('eq','https://en.wikipedia.org/wiki/LinkedIn')
            cy.get('#firstHeading',{timeout:60000})//check title on page
            .should('be.visible')
            .should('have.text','LinkedIn')
            cy.title().should('eq','LinkedIn - Wikipedia') //check title
    
        })

    })

 })

  