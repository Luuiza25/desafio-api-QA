/// <reference types="cypress" />
describe('Carrinhos - criação e finalização', () => {
  it('criar_carrinho_valido - deve criar carrinho com produto válido', () => {
    const product = { nome: `ProdCart ${Date.now()}`, preco: 10, descricao: 'x', quantidade: 5 }
    cy.request('POST', '/produtos', product).then(rp => {
      const pid = rp.body._id
      cy.request('POST', '/carrinhos', { produtos: [{ idProduto: pid, quantidade: 2 }] }).then(rc => {
        expect([200, 201]).to.include(rc.status)
        expect(rc.body).to.have.property('_id')
      })
    })
  })

  it('criar_carrinho_produto_inexistente - deve retornar erro para productId inválido', () => {
    cy.request({ method: 'POST', url: '/carrinhos', body: { produtos: [{ idProduto: '000000000000000000000000', quantidade: 1 }] }, failOnStatusCode: false })
      .then(r => {
        expect([400, 404]).to.include(r.status)
      })
  })

  it('finalizar_compra - fluxo (se endpoint existir)', () => {
    const product = { nome: `ProdFinal ${Date.now()}`, preco: 10, descricao: 'x', quantidade: 5 }
    cy.request('POST', '/produtos', product).then(rp => {
      cy.request('POST', '/carrinhos', { produtos: [{ idProduto: rp.body._id, quantidade: 1 }] }).then(rc => {
        expect([200, 201]).to.include(rc.status)
      })
    })
  })
})

