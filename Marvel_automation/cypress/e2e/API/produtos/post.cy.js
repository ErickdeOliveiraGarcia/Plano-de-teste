const body = require('/cypress/fixtures/bodyAPI');
const serverest = Cypress.config('serverest');
const rota = Cypress.config('rota');

describe('Validação da criação do produto', function () {

  it('Criando um produto', function () {


    cy.authToken("true").then((token) => {
      console.log(token)
      cy.request({
        method: 'POST',
        url: serverest + rota.produtos,
        failOnStatusCode: false,
        body: body.produtos,
        headers: {
          Authorization: `${token}`
        }
      }).as('postAPI')

      cy.get('@postAPI').then((response) => {

        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal("Cadastro realizado com sucesso");
        expect(response.body.message).not.empty;

      })
    });
  });
});