describe('Venla app', function() {
  beforeEach(function() {    
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened',  function() {
    cy.visit('http://localhost:3001')
    cy.contains('V.E.N.L.A')
  })

  it('login form can be opened', function() {
    cy.contains('Käytä vieraana').click()
    cy.contains('Hei,vieras!')
  })
})