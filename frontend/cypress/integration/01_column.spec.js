describe('Add a column',()=>{
    it('clicks add column', () => {
        cy.visit('http://localhost:3000')
        cy.wait(3000)
        cy.contains('Add a column')
        .click()
    })
    it('eneters column title',()=>{
        cy.focused()
        .should('have.class', 'sc-Axmtr fnjART')
        .type("Column added by Cypress")
        .should('have.value', 'Column added by Cypress')
    })
    it('enters column info',()=>{
        cy.get('[placeholder="Set info..."]')
        .should('have.class', 'sc-Axmtr fnjART')
        .type('Cypress typed this messege')
        .should('have.value', 'Cypress typed this messege')
    })
    it('enters column limit',()=>{
        cy.get('[placeholder="Set limit..."]')
        .should('have.class', 'sc-Axmtr fnjART')
        .type('2')
        cy.get('button')
        .click()
        .wait(3000)
    })
})