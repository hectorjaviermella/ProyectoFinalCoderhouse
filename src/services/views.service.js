import { productrepository } from "../repositories/index.js";
import { cartrepository } from "../repositories/index.js";

import CartDTO from "../daos/dtos/cart.dto.js";
import ProductDTO from "../daos/dtos/product.dto.js";

export default class ViewsService {
  constructor() {}

////////////////////////////////////////////////////////////////////////
getProducts(query,limit,page,pCategory,pStatus,sort) {
    
    return productsrepository.getProducts(query,limit,page,pCategory,pStatus,sort); 
  }

 //////////////////////////////////////////////////////////////////////////
 getProductsById(pId) {
    const product = productsrepository.getProductsById(pId);
    return product;
  }
 //////////////////////////////////////////////////////////////////////////
  getCartsById(cId) {
    const cart = cartsrepository.getCartsById(cId);
    return cart;
  }
  //////////////////////////////////////////////////////////////////////////

}
