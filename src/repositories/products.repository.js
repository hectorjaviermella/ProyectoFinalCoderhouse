export default class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }
     async getProducts(query,limit,page,pCategory,pStatus,sort){
        try {
        
      
          let products=0;              
       // products = await this.dao.getProducts(query, {limit:limit,page:page,pCategory,pStatus,lean:true,sort:sort});
       products = await this.dao.getProducts(query,limit,page,pCategory,pStatus,sort);         
           //console.log("todos los productos " ,  products);
          return products;
        } catch (error) {
            throw new Error('Error retrieving product from the database.');
        }
      };

//////////////////////////////////////////////////////////////////////////  
async getProductsById(pId){
    try {
     
      const products = await this.dao.getProductsById(pId);
      return products;
    } catch (error) {
      console.log(error);
    }
  };

/////////////////////////////////////////////////////////////////////////  
async addProduct(product){
    try {
      const createdProduct = await this.dao.addProduct(product);
      return createdProduct;
    } catch (error) {
      console.log(error);
    }
  };


/////////////////////////////////////////////////////////////////////////////////
async deleteProduct(pId){
    try {
   
        let result = await  this.dao.deleteProduct(pId);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
/////////////////////////////////////////////////////////////////////////////////////
async updateProducto(pId,productonuevo){
    try {
      //console.log("entro a updateproducto  del procut.repository"  , pId, productonuevo);
    
      const createdProduct = await this.dao.updateProducto( pId , productonuevo);
      return createdProduct;
    } catch (error) {
      console.log(error);
    }
  };

  }  
 
 