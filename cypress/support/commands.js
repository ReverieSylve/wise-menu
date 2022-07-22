Cypress.Commands.add('fillFormWithFixture', fixture => {
  cy.fixture(fixture).then(data => {
    const keys = Object.keys(data)
    keys.forEach(key => {
      cy.get(`[name="${key}"]`).type(data[key])
    })
  })
})
