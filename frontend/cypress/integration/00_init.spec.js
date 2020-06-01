describe('Cypress',()=>{
    it('its working',()=>{
        expect(true).to.equal(true)
    })
    it('visits the app', () => {
        cy.visit('http://localhost:3000')
      })
})