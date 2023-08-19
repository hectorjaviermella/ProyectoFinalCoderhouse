import { productRepository } from "../repositories/index.js";
import ProductDTO from "../daos/dtos/product.dto.js";
import  MailsService  from "../services/mails.service.js";
const mailsService = new MailsService();
export default class ProductsService {
  constructor() {}

///////////////////////////////////////////////////////////
 async getProducts(query,limit,page,pCategory,pStatus,sort) {
  
    const products = await productRepository.getProducts(query,limit,page,pCategory,pStatus,sort);
 
    return products;
  }
////////////////////////////////////////////////////////////////////////
async getProductsById(pId) {   
    const product = await productRepository.getProductsById(pId);
    return product;
  }
////////////////////////////////////////////////////////////////////////

async addProduct(product) {
 
    //const productToSave = new ProductDTO(product);
    const result = await productRepository.addProduct(product);
    return result;
  }
////////////////////////////////////////////////////////////////////////

async updateProducto(pId,productonuevo) {
   
    const createdProduct =  await productRepository.updateProducto(pId,productonuevo);
    return createdProduct;
  }

//////////////////////////////////////////////////////////////////////////////////////
async  deleteProduct(pId,usuarioemail,usuariorole) {
  try {
     let result=null;
  //const usuarioemail= "adminCoder@coder.com";
   // const usuariorole="admin";
     
    let productorecuperado =  await productRepository.getProductsById(pId);

   // console.log("usuario recuperado " ,  productorecuperado);
    if (!productorecuperado)
    {     
     // throw new Error(`Error deleting product whit id:  ${pId}`)
      
      return ({status: "error",error: "Could not delete product. No exist product"});
    }
    
 

     //si es dueno de su producto o usuario es admin se puede borrar
    if ((usuarioemail === productorecuperado.pOwner)  || (usuariorole==="admin")){
      //  console.log("entro a borrar  xxx " );
      result =  await productRepository.deleteProduct(pId);
        
        //enviar email al owner si el usuario es premium
      if ((result) && (usuariorole==="premium")){
       // console.log("entro a borrar por usuario premium");
        let psubject = `Se elimino un producto   ${productorecuperado.pTitle} `;     
          let phtml = `Se elimino un producto con  correo ${productorecuperado.pTitle} -pid: ${productorecuperado._id} `
            mailsService.sendEmail(productorecuperado.pOwner,psubject , phtml);

            //result = null;
           return result;
            
      }       
        
    }else{ 
        //si no cumple las condiciones para poder borrar un producto
      //  console.log("entro a no  borrarxxx  " );
      // throw new Error(`Error deleting product whit id: `);
        
        return ({status: "error",error: "Could not delete product. No autorize to delete" }); 
       }

    if (!result) {
      //throw new Error(`Error deleting product whit id: `)
      return ({  status: "error", error: "Could not delete product. No product found in the database" });
    }
    return result;
  } catch (error) {
   // req.logger.debug(error.message); 
    console.log(error);
  }
};


//////////////////////////////////////////////////////////////////////////


}