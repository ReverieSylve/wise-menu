describe('E2E Test for CRUD item', () => {
  beforeEach(() => {
    cy.visit('/items')
  })
  afterEach(() => {
    cy.wait(2500)
  })

  const itemFixturePath = 'item/item'
  it('Navigate to items page', () => {
    cy.get('a[href="/items"]').click()
    cy.url().should('include', '/items')
  })

  it('Create item', () => {
    cy.get('#create-item-button').click()
    cy.fillFormWithFixture(itemFixturePath)
    cy.get('#submit-create-item-button').click()
  })

  // it('Check created item data', () => {
  //   cy.getLastElement('#items-page-section .v-card').then(item => {
  //     cy.fixture(itemFixturePath).then(async data => {
  //       item.find('.v-card-title').then(element => {
  //         console.log(data, element)
  //         title.contains(data.name)
  //       })
  //     })
  //   })
  // })

  it('Edit item', () => {
    cy.get('#items-page-section .v-card:last-of-type #edit-item-button').click()
    cy.fillFormWithFixture('item/edited-item')
    cy.get('#submit-edit-item-button').click()
  })

  it('Delete item positive scenario', () => {
    cy.get('#delete-item-button').click()
    cy.get('#submit-delete-item-button').click()
  })
})
