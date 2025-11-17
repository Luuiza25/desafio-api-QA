Cypress.Commands.add('createUser', (user) => {
  return cy.request({ method: 'POST', url: '/usuarios', body: user, failOnStatusCode: false })
})

Cypress.Commands.add('login', (email, password) => {
  return cy.request({ method: 'POST', url: '/login', body: { email, password }, failOnStatusCode: false })
})

Cypress.Commands.add('createProduct', (product, token) => {
  return cy.request({ method: 'POST', url: '/produtos', headers: { Authorization: token }, body: product, failOnStatusCode: false })
})

