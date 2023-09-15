import Produto from '../shared/model/produtos.js';
import  renderList  from './components/render-itens.js';

let containerProdutos = document.querySelector('#containerProdutos');
const xmlHttp = new XMLHttpRequest();

let listaProdutos = [];

xmlHttp.onreadystatechange = function () {
   if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      const data = JSON.parse(xmlHttp.responseText);
      for (let item of data) {
         item.marca = item.marca ? item.marca : '';
         item.descricao = item.descricao ? item.descricao : '';
         const newProduto = new Produto(item?.nome, item?.descricao, item?.marca, item?.valor, item?.imagem);
         listaProdutos.push(newProduto);
      }
      console.log(listaProdutos);
      renderList(listaProdutos);

   }
}


xmlHttp.open("GET", "../../db.json", true);
xmlHttp.send();