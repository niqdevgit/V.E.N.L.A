describe('Venla app', function() {
  beforeEach(function() {    
    cy.visit('http://localhost:3001')
  })

  it('front page can be opened',  function() {
    cy.contains('V.E.N.L.A')
  })

  it('Visitor can login', function() {
    cy.contains('Käytä vieraana').click()
    cy.contains('Hei, vieras')
  })
})