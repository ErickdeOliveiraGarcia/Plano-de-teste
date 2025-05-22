const body = require('/cypress/fixtures/bodyAPI');
const serverest = Cypress.config('serverest');
const rota = Cypress.config('rota');

describe('Validação da busca do produto', function () {

    it('Buscando um produto', function () {

        cy.authToken("true").then((token) => {

            cy.request({
                method: 'POST',
                url: serverest + rota.produtos,
                failOnStatusCode: false,
                body: body.produtos,
                headers: {
                    Authorization: `${token}`
                }
            }).then((responsePost) => {
                const postBody = {
                    _id: responsePost.body._id,
                }

                cy.request({
                    method: 'GET',
                    url: `${serverest}${rota.produtos}/${postBody._id}`,
                    failOnStatusCode: false,

                }).then((getResponse) => {
                    expect(getResponse.status).equal(200)
                    expect(getResponse.body._id).equal(postBody._id)
                    expect(getResponse.body.nome).equal(body.produtos.nome)
                    expect(getResponse.body.descricao).equal(body.produtos.descricao)
                    expect(getResponse.body.preco).equal(body.produtos.preco)
                    expect(getResponse.body.quantidade).equal(body.produtos.quantidade)
                })
            })
        });
    });

    it('Buscando produto inexistente', () => {

        const postBody = {
            _id: "errorQAtstauto123"
        }

        cy.request({
            method: 'GET',
            url: `${serverest}${rota.produtos}/${postBody._id}`,
            failOnStatusCode: false,

        }).then((getResponse) => {
            expect(getResponse.status).equal(400)
            expect(getResponse.body.message).equal("Produto não encontrado")
            expect(getResponse.body.message).not.empty;
        })
    })

});