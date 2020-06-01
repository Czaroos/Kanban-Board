describe('Add a user',()=>{
    it('waits for db connect', () => {
        cy.visit('http://localhost:3000')
        cy.wait(3000)
    })
   it('clicks add user',()=>{
        cy.contains('Add a user')
        .click()
   })
   it('eneters user name',()=>{
       cy.focused()
       .should('have.class', 'sc-Axmtr fnjART')
       .type("Test")
       .should('have.value', 'Test')
    })
    it('set user limit',()=>{
        cy.get('[placeholder="Set limit..."]')
        .should('have.class', 'sc-Axmtr fnjART')
        .type('1')
        .should('have.value', '1')
    })
    it('confirm user',()=>{
        cy.get('button')
        .click()
        .wait(3000)
    })
})
