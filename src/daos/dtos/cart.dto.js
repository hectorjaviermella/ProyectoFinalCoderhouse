export default class CartDTO {
    constructor(cart) {
      this._id = cart._id;
      this.products =  cart.products;
      
      
    }
  }