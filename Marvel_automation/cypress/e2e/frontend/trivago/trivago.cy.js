
const baseUrlCorreios = Cypress.config('baseUrlCorreios')
const rota = Cypress.config('rota')
const trivago = Cypress.config('trivago')

describe(' Validação Trivago', () => {

  it('Verificando informações no site Trivago', () => {

    cy.clearCookies();

    cy.getCookies().then((cookies) => {
      cookies.forEach((cookie) => {
        cy.setCookie(cookie.name, cookie.value);
      });

      cy.visit(trivago, { failOnStatusCode: false }, { force: true });

      cy.get('[data-testid="search-form-destination"]').click().type('Manaus')
      cy.wait(5000);
      cy.get('span[data-testid="suggestion-subtitle"]').contains('Cidade · Amazonas, Brasil').click()
      cy.wait(5000);
      cy.get('button').as('btn').click()
      cy.wait(5000);
      cy.get('button[data-testid="search-button-with-loader"]').click()

      cy.get('select[id="sorting-selector"]').click()
      cy.get('div select[id="sorting-selector"] option').contains('Avaliação e sugestões').click()
      cy.wait(5000);

      cy.get('li span[itemprop="name"]').eq(0).invoke('text').then((text) => {
        cy.log(`Nome ${text}`);
      })
      cy.get('li strong[class="leading-none"]').eq(0).invoke('text').then((text) => {
        cy.log(`Avaliações ${text}`);
      })
      cy.get('li p[data-testid="recommended-price"]').eq(0).invoke('text').then((text) => {
        cy.log(`Valor ${text}`);
      })
    });
  });
});