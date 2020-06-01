describe('Add a task',()=>{
    it('waits for db connect', () => {
        cy.visit('http://localhost:3000')
        cy.wait(3000)
    })
    it('clicks add task button',()=>{
        cy.get('[tabindex="0"]')
        .last()
        .contains('Add a task')
        .click()
    })
    it('enters task name',()=>{
        cy.focused()
        .should('have.class', 'sc-Axmtr fnjART')
        .type("E2E testing")
        .should('have.value', 'E2E testing')
    })
    it('sets task priority',()=>{
        cy.get('input')
        .last()
        .click()
    })
    it('confirm task',()=>{
        cy.get('button')
        .click()
        .wait(3000)
    })
})