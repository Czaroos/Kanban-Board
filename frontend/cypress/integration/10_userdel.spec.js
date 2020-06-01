describe('Deletes a user',()=>{
    it('waits for db connect', () => {
        cy.visit('http://localhost:3000')
        cy.wait(3000)
    })
   it('clicks trashcan incon',()=>{
        cy.get('[class="sc-fzplWN hKAPVO"]')
        .eq(2)
        .children()
        .first()
        .click({force: true})
   })
   it('confirms choice',()=>{
    cy.get('button')
    .contains('Yes')
    .click()
    .wait(3000)
})
})