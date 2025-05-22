const body = require('/cypress/fixtures/bodyAPI');
const serverest = Cypress.config('serverest');
const rota = Cypress.config('rota');

describe('Validação da busca do usuário', function () {

    it('Buscando usuário', function () {

        cy.request({
            method: 'POST',
            url: `${serverest}${rota.usuarios}/`,
            failOnStatusCode: false,
            body: body.usuarios,
        }).then((responsePost) => {

            const postBody = {
                _id: responsePost.body._id,
                nome: body.usuarios.nome,
                email: body.usuarios.email,
                password: body.usuarios.password,
                administrador: body.usuarios.administrador
            }

            cy.request({
                method: 'GET',
                url: `${serverest}${rota.usuarios}/${postBody._id}`,
                failOnStatusCode: false,

            }).then((getResponse) => {

                expect(getResponse.status).equal(200)
                expect(getResponse.body.nome).equal(postBody.nome)
                expect(getResponse.body._id).equal(postBody._id)
                expect(getResponse.body.email).equal(postBody.email)
                expect(getResponse.body.password).equal(postBody.password)
                expect(getResponse.body.administrador).equal(postBody.administrador)

            })
        })
    });


    it('Buscando um usuário inexistente', () => {

        const postBody = {
            _id: "errorQAtstauto123"
        }

        cy.request({
            method: 'GET',
            url: `${serverest}${rota.usuarios}/${postBody._id}`,
           failOnStatusCode: false,

        }).then((getResponse) => {

            expect(getResponse.status).equal(400)
            expect(getResponse.body.message).equal("Usuário não encontrado")
            expect(getResponse.body.message).not.empty;
        })
    })

});