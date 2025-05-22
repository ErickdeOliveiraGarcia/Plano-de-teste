export default class Funcao {

    geraNomeEletronicoRandom() {
        const vn1 = ['Iphone 15', 'Iphone 14', 'Iphone 13', 'Iphone 8', 'Iphone SE', 'Iphone SE 2']
        const vn2 = ['64', '128', '512', '1TB', '2TB']
        const vn3 = ['Azul', 'Preto', 'Cinza', 'Verde', 'Céu azul', 'Vermelho']
        const vn4 = ['Pro','Max','Mini']
      
        const vn1Random = vn1[Math.floor(Math.random() * vn1.length)]
        const vn2Random = vn2[Math.floor(Math.random() * vn2.length)]
        const vn3Random = vn3[Math.floor(Math.random() * vn3.length)]
        const vn4Random = vn4[Math.floor(Math.random() * vn4.length)]

        return`${vn1Random} ${vn2Random} ${vn3Random} ${vn4Random}`
  
  
      }

}
