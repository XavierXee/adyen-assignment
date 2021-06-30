describe('Currency Converter', () => {
  it('Verify initial state', () => {
    cy.visit('/')
    cy.get('#source-value')
      .invoke('val')
      .then((sourceValue) => {
        expect(sourceValue).to.equal('1');
      });
    cy.get('#source-currency').select('EUR').should('have.value', 'EUR')
  })

  it('Verify state update', () => {
    cy.intercept(
      'GET',
      '/api/time-series*',
      { fixture: 'rates.json' }
    ).as('getRates');
    cy.visit('/')
    cy.wait('@getRates').then(() => {
      cy.get('#target-0')
        .invoke('val')
        .then((targetValue) => {
          expect(targetValue).to.equal('3.19004');
        });
    })

  })
})
