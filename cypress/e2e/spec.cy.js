describe('E2E Test for CRUD item', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
  })
  it('Create item positive scenario', () => {
    cy.visit('/')
    cy.get('a[href="/items"]').click()
    cy.url().should('include', '/items')
    cy.get('#create-item-button').click()
    cy.fillFormWithFixture('item')
    cy.get('#submit-create-item-button').click()
  })
})
