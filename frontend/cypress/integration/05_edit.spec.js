describe('Edit columns title',()=>{
    it('clicks column title', () => {
        cy.visit('http://localhost:3000')
        cy.wait(3000)
        cy.contains('Column added by Cypress')
        .click()
    })
    it('changes coliumn title', () =>{
        cy.focused()
        .type("Column edited by Cypress")
        .should('have.value', 'Column edited by Cypress')
        .type('{enter}')
        .wait(3000)
    })
})