/// <reference types="cypress" />
describe('Usuarios - CRUD e validações', () => {
  it('criar_usuario_valido - deve criar usuário', () => {
    const user = {
      nome: `User Test ${Date.now()}`,
      email: `user.test.${Date.now()}@example.com`,
      password: 'Senha1234',
      administrador: 'true'
    }
    cy.createUser(user).then((resp) => {
      expect([200, 201]).to.include(resp.status)
      expect(resp.body).to.have.property('_id')
      Cypress.env('createdUserId', resp.body._id || resp.body._id_usuario)
    })
  })

  it('criar_usuario_email_existente - deve falhar ao criar com email duplicado', () => {
    const user = {
      nome: `UserDup ${Date.now()}`,
      email: `dup.${Date.now()}@example.com`,
      password: 'Senha1234',
      administrador: 'true'
    }
    cy.createUser(user).then(() => {
      cy.createUser(user).then((r2) => {
        expect([400, 409]).to.include(r2.status)
      })
    })
  })

  it('listar_usuarios - deve retornar lista', () => {
    cy.request('GET', '/usuarios').then((r) => {
      expect(r.status).to.equal(200)
      expect(r.body).to.have.property('quantidade')
    })
  })
})

