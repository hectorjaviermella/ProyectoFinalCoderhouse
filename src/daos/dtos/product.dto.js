export default class ProductDTO {
    constructor(product) {
      this._id = product._id;
      this.pTitle = product.pTitle;      
      this.pDescription = product.pDescription;
      this.pCode = product.pCode;
      this.pPrice = product.pPrice;
      this.pStatus = product.pStatus;
      this.pStock = product.pStock;
      this.pCategory = product.pCategory;
      this.pThumbnail = product.pThumbnail;
      
    }
  }