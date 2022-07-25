describe('E2E Test for CRUD item', () => {
  afterEach(() => {
    cy.wait(3000)
  })

  it('Create item positive scenario', () => {
    cy.visit('/')
    cy.get('a[href="/items"]').click()
    cy.url().should('include', '/items')
    cy.get('#create-item-button').click()
    cy.fillFormWithFixture('item')
    cy.get('#submit-create-item-button').click()
  })

  it('Edit item positive scenario', () => {
    cy.clickLastButton('button#edit-item-button')
    cy.fillFormWithFixture('edited-item')
    cy.get('#submit-edit-item-button').click()
  })

  it('Delete item positive scenario', () => {
    cy.clickLastButton('button#delete-item-button')
    cy.get('#submit-delete-item-button').click()
  })
})
