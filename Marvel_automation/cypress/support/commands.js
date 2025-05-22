const body = require('/cypress/fixtures/bodyAPI');
const apiAuthCorreio = Cypress.config('apiAuthCorreio')
const serverest = Cypress.config('serverest')
const rota = Cypress.config('rota');

Cypress.Commands.add('authToken', (administrador) => {

    body.usuarios.administrador = administrador

    cy.request({
        method: 'POST',
        url: serverest + rota.usuarios,
        failOnStatusCode: false,
        body: body.usuarios,
    }).as('postAPI')

    cy.get('@postAPI').then((responsePostUsuario) => {
        expect(responsePostUsuario.status).to.equal(201);
        expect(responsePostUsuario.body.message).to.equal("Cadastro realizado com sucesso")
        expect(responsePostUsuario.body.message).not.empty
        const postBody = {
            email: body.usuarios.email,
            password: body.usuarios.password,
        }

        cy.request({
            method: 'POST',
            url: serverest + rota.login,
            failOnStatusCode: false,
            body: postBody
        }).as('responsePostlogin')

        cy.get('@responsePostlogin').then((responsePostlogin) => {
            expect(responsePostlogin.status).to.equal(200);
            expect(responsePostlogin.body.message).to.equal("Login realizado com sucesso")
            expect(responsePostlogin.body.message).not.empty

             return responsePostlogin.body.authorization
        })
    })
})


Cypress.Commands.add('authTokenCorreios',()=>{
    
    cy.request({
        method: 'POST',
        url: apiAuthCorreio,
        headers: {
          'Authorization': 'Basic ZXJpY2tpbXBvcnRzOldFRHdyekNyd21WaXA1TWJhS2FCMGhTa2NFNEYxUXRYdjlDZWM3RDE=',
          'Content-Type': 'application/json',
        },
      }).then((response) => {
  
        cy.setCookie('Authorization Basic', response.body.token)
    })
})

// cypress/support/tasks.js

const axios = require('axios');

// cypress/support/commands.js


Cypress.Commands.add('getAndSetCookies', (url) => {
  return axios.get(url, { withCredentials: true },{force:true})
    .then((response) => {
      const cookies = response.headers['set-cookie'];

      cookies.forEach((cookie) => {
        cy.setCookie(cookie);
      });
    });
});
