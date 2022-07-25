Cypress.Commands.add('fillFormWithFixture', fixture => {
  cy.fixture(fixture).then(data => {
    const keys = Object.keys(data)
    keys.forEach(key => {
      cy.get(`[name="${key}"]`).clear().type(data[key], { delay: 50 })
    })
  })
})

Cypress.Commands.add('clickLastButton', selector => {
  cy.get('main')
    .find(selector)
    .then(buttons => {
      buttons[buttons.length - 1].click()
    })
})
