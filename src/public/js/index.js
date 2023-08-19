/*const socket = io();

// DOM element
let productsElem = document.getElementById("products");

socket.on("product_added", (product) => {
  let item = document.createElement("div");
  item.classList.add("gallery");
  item.innerHTML = `<h2>${product.pTitle}</h2> <p>$${product.pPrice}</p> <p>${product.pDescription}</p>`;
  productsElem.appendChild(item);
});

socket.on("product_deleted", (productIndex) => {
  productsElem.removeChild(productsElem.children[productIndex]);
});

*/
/*
const socket = io();
const list = document.getElementById("productos")
socket.on("sprod", (productos) => {    
   console.log(productos)    
       let listProducts = "";
       productos.forEach((prod) => {     
        listProducts += `<br>`+`-`+`pId : ${prod.pId} / pTitle: ${prod.pTitle}  / pCode : ${prod.pCode} / pDescription : ${prod.pDescription} / pPrice: ${prod.pPrice}</br>`;
    });
    
    list.innerHTML = `${listProducts}`
 
});*/


const socket = io();
const list = document.getElementById("listproducts")
socket.on("sprod", (products) => {    
   console.log(products)    
       let listProducts = "";
    products.forEach((prod) => {     
        listProducts += `<br>`+`-`+`pId : ${prod.pId} / pTitle: ${prod.pTitle}  / pCode : ${prod.pCode} / pDescription : ${prod.pDescription} / pPrice: ${prod.pPrice}</br>`;
    });
    
    list.innerHTML = `${listProducts}`
 
});
