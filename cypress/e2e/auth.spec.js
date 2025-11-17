/// <reference types="cypress" />
describe('Auth - LOGIN', () => {
  it('login_sucesso - deve retornar token para credenciais válidas', () => {
    const email = `user${Date.now()}@test.com`
    const user = { nome: 'uTest', email, password: 'senha123', administrador: 'true' }
    cy.request('POST', '/usuarios', user).then((resp) => {
      expect([200, 201]).to.include(resp.status)
      cy.request('POST', '/login', { email: user.email, password: user.password }).then(r => {
        expect(r.status).to.equal(200)
        expect(r.body).to.have.property('authorization')
        Cypress.env('token', r.body.authorization)
      })
    })
  })

  it('login_senha_invalida - deve retornar erro para senha inválida', () => {
    cy.request({ method: 'POST', url: '/login', body: { email: 'naoexiste@x.com', password: 'errada' }, failOnStatusCode: false })
      .then((r) => {
        expect([400, 401]).to.include(r.status)
      })
  })
})

