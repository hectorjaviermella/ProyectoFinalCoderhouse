//import { cartsrepository } from "../repositories/carts.repository.js";
import { cartRepository } from "../repositories/index.js";
import CartDTO from "../daos/dtos/cart.dto.js";

export default class CartsService {
  constructor() {}

////////////////////////////////////////////////////////////////////////
async getCartsById(id) {
  
    const cart = await cartRepository.getCartsById(id);

    return cart;
  }
////////////////////////////////////////////////////////////////////////
async createCart(cart) {
  
    const createCart =  await cartRepository.createCart(cart);
    return createCart;
  }
  ////////////////////////////////////////////////////////////////////////

  async  addProductToCart(cId,pId,pquantity) {
    const cart = await cartRepository.addProductToCart(cId,pId,pquantity);
    return cart;
  }
 ////////////////////////////////////////////////////////////////////////

 async deleteCart(cId) {
    const deleteCart = await cartRepository.deleteCart(cId);
    return deleteCart;
  }

 ////////////////////////////////////////////////////////////////////////
 async deleteProductToCart(cId,pId) {
  
    const deleteCart = await cartRepository.deleteProductToCart(cId,pId);
    
    return deleteCart;
  }


////////////////////////////////////////////////////////////////////////

async updateQuantitytoProductToCart(cId,pId,pquantity) {

  const cart = await cartRepository.updateQuantitytoProductToCart(cId,pId,pquantity);
  return cart;
}

////////////////////////////////////////////////////////////////////////

async updatetoListProducToCart(cId,listproduc) {
  const cart = await cartRepository.updatetoListProducToCart(cId,listproduc);
  return cart;
}
////////////////////////////////////////////////////////////////////////

}

