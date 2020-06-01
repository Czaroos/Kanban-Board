describe('Delete a task',()=>{
    it('waits for db connect', () => {
        cy.visit('http://localhost:3000')
        cy.wait(3000)
    })
    it('clicks delete task button',()=>{
        cy.contains('E2E testing')
        cy.get('[class="material-icons MuiIcon-root sc-fzoXzr iAcbTz MuiIcon-fontSizeSmall"]')
        .last()
        .contains('delete')
        .click({force: true})
    })
    it('confirms choice',()=>{
        cy.get('button')
        .contains('Yes')
        .click()
        .wait(3000)
    })
})