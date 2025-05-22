const body = require('/cypress/fixtures/bodyAPI');
const serverest = Cypress.config('serverest');
const rota = Cypress.config('rota');

describe('Validação da criação do usuário', function () {

  it('Cadastrando um novo usuário administrador', function () {

    cy.request({
      method: 'POST',
      url: serverest + rota.usuarios,
      failOnStatusCode: false,
      body: body.usuarios,
    }).as('postAPI')

    cy.get('@postAPI').then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal("Cadastro realizado com sucesso");
      expect(response.body.message).not.empty;

    });
  });
  it('Cadastrando usuário administrador com e-mail já existente', function () {

    cy.request({
      method: 'GET',
      url: serverest + rota.usuarios,
      failOnStatusCode: false
    }).as('getAPI')

    cy.get('@getAPI').then((response) => {

      delete response.body.usuarios[0]._id

      cy.request({
        method: 'POST',
        url: serverest + rota.usuarios,
        failOnStatusCode: false,
        body: response.body.usuarios[0],
      }).as('postAPI')
  
      cy.get('@postAPI').then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal("Este email já está sendo usado");
        expect(response.body.message).not.empty;
 
      });
    });
  });
});
