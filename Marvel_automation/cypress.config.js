const { defineConfig } = require("cypress");

module.exports = defineConfig({

  viewportWidth: 1280,
  viewportHeight: 720,

  defaultCommandTimeout: 10000,
  pageLoadTimeout: 40000,

  experimentalModifyObstructiveThirdPartyCode:true,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

  serverest: 'https://serverest.dev',
  correios: 'http://www.buscacep.correios.com.br',
  apiAuthCorreio: 'https://api.correios.com.br/token/v1/autentica',
  trivago: 'http://www.trivago.com.br',

  rota: { 
    usuarios: '/usuarios',
    produtos: '/produtos',
    login: '/login',
    endereco: '/app/endereco/index.php'

   },   
  },
});
