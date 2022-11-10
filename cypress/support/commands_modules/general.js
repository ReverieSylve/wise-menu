const fillFormWithFixture = fixture => {
  cy.fixture(fixture).then(data => {
    const keys = Object.keys(data)
    keys.forEach(key => {
      cy.get(`[name="${key}"]`).clear().type(data[key], { delay: 25 })
    })
  })
}

const getLastElement = selector => cy.get(selector).last()

export { fillFormWithFixture, getLastElement }
