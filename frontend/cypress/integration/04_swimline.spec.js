describe('Add a swimlane',()=>{
    it('waits for db connect', () => {
        cy.visit('http://localhost:3000')
        cy.wait(3000)
    })
   it('clicks add swimlane',()=>{
        cy.contains('Add a swimlane')
        .click()
   })
   it('eneters swimlane name',()=>{
       cy.focused()
       .should('have.class', 'sc-Axmtr fnjART')
       .type("Project Foo")
       .should('have.value', 'Project Foo')
    })
    it('confirm swimlane',()=>{
        cy.get('button')
        .click()
        .wait(3000)
    })
})
