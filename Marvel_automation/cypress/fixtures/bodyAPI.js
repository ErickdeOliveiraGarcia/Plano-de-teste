const randomEmail = require('random-email');
import Funcao from '../pageObjects/funcao'

const funcao = new Funcao()

const usuarios = {
  nome: "Fulano da Silva123",
  email: randomEmail({ domain: 'qatst.com.br' }),
  password: "teste123",
  administrador: "true"
};

const produtos = {
  nome: funcao.geraNomeEletronicoRandom(),
  preco: 470,
  descricao: "Smartphone",
  quantidade: 381
};

export { usuarios, produtos };
