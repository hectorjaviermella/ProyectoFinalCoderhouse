import { productModel } from "./model/product.js";
import  { ObjectId }   from "mongodb";
//const { Types } = mongoose;

class Product {
  constructor() {}
  //////////////////////////////////////////////////////////////////////////
  
  async getProducts(query,limit,page,pCategory,pStatus,sort){
    try {    
  
      let products=0;               
     products = await productModel.paginate(query, {limit:limit,page:page,pCategory,pStatus,lean:true,sort:sort});  
     //console.log("product.mongo todos " , products)
      return products;
    } catch (error) {
        throw new Error('Error retrieving product from the database.');
    }
  };

//////////////////////////////////////////////////////////////////////////  
async getProductsById(pId){
try {
  
 
  const products = await productModel.findById({ _id: pId ,lean:true }).lean();

  
  return products;
} catch (error) {
  console.log(error);
}
};

/////////////////////////////////////////////////////////////////////////  
async addProduct(product){
try {
 
  const createdProduct = await productModel.create(product);
  
  return createdProduct;
} catch (error) {
  console.log(error);
}
};


/////////////////////////////////////////////////////////////////////////////////
async deleteProduct(pId){
try {
    let result = await  productModel.deleteOne({ _id: pId });
  return result;
} catch (error) {getProductsById
  console.log(error);
}
};
/////////////////////////////////////////////////////////////////////////////////////
async updateProducto(pId,productonuevo){
try {
  const createdProduct = await productModel.updateOne({ _id: pId }, productonuevo);
  return createdProduct;
} catch (error) {
  console.log(error);
}
};
/////////////////////////////////////////////////////////////////////////////////////

}
export const productMongo = new Product();


