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


xmlHttp.open("GET", "https://imports-da-realeza.github.io/catalogo/db.json", true);
xmlHttp.send();


const renderList = (listaProdutos) => {
   const div = document.createElement('div');
   div.classList.add('row');
   div.classList.add('row-md-cols-5');
   div.classList.add('row-sm-cols-2');
   div.classList.add('justify-content-center');
   div.classList.add('align-items-center');
   div.style.width = '100%';
   div.style.marginTop = '40px';

   for (let item of listaProdutos) {
      const div2 = document.createElement('div');
      div2.classList.add('col');
      div2.classList.add('d-flex');
      div2.classList.add('justify-content-center');
      div2.classList.add('align-items-center');
      div2.style.marginBottom = '30px';
      div2.innerHTML = `
         <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
               <p class="card-title fs-5 mb-2 fw-bolder text-uppercase">${item.nome}</p>
               <p class="card-text mb-2">${item.descricao}</p>
               <div class="d-flex justify-content-between">
                  <span class="badge bg-primary text-end">${item.marca}</span>
                  <p class="card-text fw-bolder">R$ ${(item.valor * 1.0 ).toFixed(2)}</p>
               </div>
               <a href="#" class="btn btn-success mt-3">Peça agora</a>
            </div>
         </div>
      `;

      div.appendChild(div2);

   }
   containerProdutos.appendChild(div);
}


class Produto {
	constructor(nome, descricao, marca, valor, imagem) {
		this.nome = nome;
		this.valor = valor;
		this.descricao = descricao;
		this.imagem = imagem;
		this.marca = marca;
	}

}