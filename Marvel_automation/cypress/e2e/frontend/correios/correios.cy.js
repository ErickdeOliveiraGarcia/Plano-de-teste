
const correios = Cypress.config('correios')
const rota = Cypress.config('rota')

describe('Correios', () => {


  it('Busca do CEP', () => {

    cy.visit(correios + rota.endereco, { wait: 12000 });

    cy.get('div[class="campos"] h2').should('have.text', 'Busca CEP')
    cy.get('input[id="endereco"]').type('69005-040')
    cy.get('div [name="btn_pesquisar"]').click()
    cy.get('div h5').should('have.text', 'Resultado da Busca por Endereço ou CEP')

    cy.get('tbody td[data-th="Logradouro/Nome"]').should('have.text', 'Rua Miranda Leão')
    cy.get('tbody td[data-th="Bairro/Distrito"]').should('have.text', 'Centro')
    cy.get('tbody td[data-th="Localidade/UF"]').should('have.text', 'Manaus/AM')
    cy.get('tbody td[data-th="CEP"]').should('have.text', '69005-040')
  })
});

it('Busca do endereço das lojas', () => {

  
  cy.authTokenCorreios()

  cy.visit(correios + rota.endereco, { wait: 12000 });

  cy.get('div[class="campos"] h2').should('have.text', 'Busca CEP')
  cy.get('input[id="endereco"]').type('Lojas Bemol')
  cy.get('div [name="btn_pesquisar"]').click()
  cy.get('div h5').should('have.text', 'Resultado da Busca por Endereço ou CEP')

  cy.get('tbody td[data-th="Logradouro/Nome"]').should('have.text', 'Rua Miranda Leão, 41Lojas Bemol')
  cy.get('tbody td[data-th="Bairro/Distrito"]').should('have.text', 'Centro')
  cy.get('tbody td[data-th="Localidade/UF"]').should('have.text', 'Manaus/AM')
  cy.get('tbody td[data-th="CEP"]').should('have.text', '69005-901')
});

