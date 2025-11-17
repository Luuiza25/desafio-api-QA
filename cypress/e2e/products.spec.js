/// <reference types="cypress" />
describe('Produtos - criação e validações', () => {
  let token = null

  before(() => {
    const admin = { nome: `admin${Date.now()}`, email: `admin${Date.now()}@test.com`, password: 'senha123', administrador: 'true' }
    cy.request('POST', '/usuarios', admin).then(() => {
      cy.request('POST', '/login', { email: admin.email, password: admin.password }).then(r => {
        token = r.body.authorization
        Cypress.env('adminToken', token)
      })
    })
  })

  it('criar_produto_valido - deve criar produto quando autenticado', () => {
    const product = { nome: `Prod ${Date.now()}`, preco: 199, descricao: 'x', quantidade: 10 }
    cy.createProduct(product, token).then((r) => {
      expect(r.status).to.equal(201)
      expect(r.body).to.have.property('_id')
      Cypress.env('createdProductId', r.body._id)
    })
  })

  it('criar_produto_campos_invalidos - deve retornar erro para payload inválido', () => {
    cy.createProduct({ nome: '', preco: -10, quantidade: -5 }, token).then((r) => {
      expect([400, 422]).to.include(r.status)
    })
  })

  it('listar_produtos - deve retornar lista', () => {
    cy.request('GET', '/produtos').then(r => {
      expect(r.status).to.equal(200)
      expect(r.body).to.have.property('produtos')
    })
  })
})

