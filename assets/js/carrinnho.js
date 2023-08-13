if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

var totalAmount = "0,00"

function ready() {
  catalogo();
}

let produtoSelecionados = []

function addProductToCart(id) {
  let produto = produtos.find(p => p.id == id);
  if (produtoSelecionados.some(p => p.id == id)) {
      let produtoS = produtoSelecionados.find(p => p.id == id);
      produtoS.quantitdade++;
  } else {
      produtoSelecionados.push({
          name: produto.name,
          img: produto.img,
          price: produto.price,
          id: produto.id,
          quantitdade: 1
      });
  }
  atualizarCarrinho();
}

function removerProduto(index) {
  produtoSelecionados.splice(index, 1);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const tableBody = document.querySelector(".cart-table tbody");
  tableBody.innerHTML = "";

  produtoSelecionados.forEach((item, index) => {
      let newCartProduct = document.createElement("tr");
      newCartProduct.classList.add("cart-product");

      newCartProduct.innerHTML =
          `
          <td class="product-identification">
              <img src="${item.img}" alt="${item.name}" class="cart-product-image">
              <strong class="cart-product-title">${item.name}</strong>
          </td>
          <td>
              <span class="cart-product-price">R$ ${parseFloat(item.price).toFixed(2)}</span>
          </td>
          <td>
              <input type="number" value="${item.quantitdade}" min="0" class="product-qtd-input">
              <button type="button" class="remove-product-button">Remover</button>
          </td>
      `;
      tableBody.append(newCartProduct);

      const removeButton = newCartProduct.querySelector('.remove-product-button');
      removeButton.addEventListener('click', () => {
          removerProduto(index);
      });

      const qtdInput = newCartProduct.querySelector('.product-qtd-input');
      qtdInput.addEventListener('change', () => {
          atualizarQuantidade(index, qtdInput.value);
      });
  });

  updateTotal();
}

function atualizarQuantidade(index, novaQuantidade) {
  if (novaQuantidade <= 0) {
      removerProduto(index);
  } else {
      produtoSelecionados[index].quantitdade = parseInt(novaQuantidade, 10);
      atualizarCarrinho();
  }
}


function makePurchase() {
  if (totalAmount === "0,00") {
      alert("Seu carrinho está vazio!");
  } else {
      document.querySelector(".cart-table tbody").innerHTML = "";
      updateTotal();
  }
}

function updateTotal() {
  totalAmount = 0;
  produtoSelecionados.forEach(produto => {
      totalAmount += produto.price * produto.quantitdade;
  });
  document.querySelector(".cart-total-container span").innerText = "R$ " + parseFloat(totalAmount).toFixed(2);
}


function catalogo() {
  const catalogo = document.querySelector("#catalogo");
  produtos.forEach(produto => {
      let htmlproduto = document.createElement("div");
      htmlproduto.classList.add("product");

      htmlproduto.classList.add("text-center");

      htmlproduto.classList.add("col-lg-3");

      htmlproduto.classList.add("col-md-4");
      htmlproduto.classList.add("col-12");
      htmlproduto.classList.add("cart-product");

      htmlproduto.innerHTML = `
      <img class="img-fluid mb-3 product-image" src="${produto.img}" alt="">
              <div class="star">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
              </div>
              <h5 class="p-name product-title">${produto.name}</h5>
              <h4 class="p-price product-price">R$ ${parseFloat(produto.price).toFixed(2)}</h4>
              <button onclick="addProductToCart(${produto.id})" class="buy-btn">Compre Agora</button>
      `;
      catalogo.append(htmlproduto);
  });
}
