describe('Block a task',()=>{
    it('waits for db connect', () => {
        cy.visit('http://localhost:3000')
        cy.wait(3000)
    })
    it('clicks block task button',()=>{
        cy.contains('E2E testing')
        cy.get('[class="MuiSvgIcon-root sc-fzqNJr hNikjE MuiSvgIcon-fontSizeSmall"]')
        .last()
        .click({force: true})
    })
    it('waits 1 second',()=>{
        cy.wait(1000)
    })
    it('unblock task',()=>{
        cy.contains('E2E testing')
        cy.get('[d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"]')
        .click({force: true})
        .wait(3000)
    })
    
})