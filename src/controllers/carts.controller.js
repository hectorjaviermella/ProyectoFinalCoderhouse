import  CartsService  from "../services/carts.service.js";
import  ProductsService  from "../services/products.service.js";
import  TicketService  from "../services/tickets.service.js";

const cartsService = new CartsService();
const productsService = new ProductsService();
const ticketService = new TicketService();


//////////////////////////////////////////////////////////////////////////////////////////////
export async function getCardId(req, res) {
  try {
    req.logger.debug('entro al getCardId');
    const cId = req.params.cId;
   
    
    const cart = await cartsService.getCartsById(cId);
    if (!cart) {
        return res
          .status(400)
          .send({ status: "error", error: "No se pudo encontrar el carrito" });
      }
    return res.send({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  }

//////////////////////////////////////////////////////////////////////////////////////////////
  export async function createCart(req, res) {
    try {
      req.logger.debug('entro al createCart');
        const cart = req.body;
        const createdCart = await cartsService.createCart(cart);    
      if (!createdCart) {
        return res
          .status(400)
          .send({ status: "error", message: "Error to create cart", error: "No se pudo crear el carrito" });
      }
      return res.send({ status: "success", message: "cart created", payload: createdCart});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
/////////////////////////////////////////////////////////////////////////////////////////////
export async function addProductToCart(req, res) {
  try { 
    req.logger.debug('entro al addProductToCart');
    const user =  req.session.user;
    
   // let usuarioautorizado=true;
    //console.log("usario xxx" , req.session.user );

        let pquantity={"quantity":1};
        if (!req.body)
            pquantity = req.body;      
        const cId = req.params.cId;
        const pId  = req.params.pId;

       
       
    
        let product = await productsService.getProductsById(pId);
       

       if (!user===undefined){
         if (user.email=== product.pOwner && user.role==='premium')  {
          console.log("usuario premiun no  puede agregar un producto que le pertenece ");
          return  res.send({
            status: "Noautorizado",
            message: "User not autorized  Add Product to cart",
           
          });
         }
       }
      
       
        if  (product && product.pStock>0){
            let created =  await cartsService.addProductToCart(cId,pId,pquantity);    
            return res.send({
              status: "success",
              message: "Product Add to cart",
              payload: cId,
            });
      }else{
        return res.send({
          status: "Error",
          message: "Product do not stock",
          payload: cId,
        });
      }

      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};
//////////////////////////////////////////////////////////////////////////////////////
//elimina todo los productos del carrito

export async function deleteCardId(req, res) { 
  try {
        req.logger.debug('entro al deleteCardId');
        const { cId } = req.params;
        let result =  await cartsService.deleteCart(cId);
        if (!result) {
          return res
            .status(404).send({
            status: "error",
            error: "Could not delete cart. No cart found in the database",
          });
        }
        
        return res.send({
            status: "success",
            message: "Delete to cart",
            payload: result,
          });     

     } catch (error) {
          res.status(500).json({ error: error.message });
        }
};
  ////////////////////////////////////////////////////////////////////////////////////////////////
//elimina un producto del carrito especifico
export async function deleteProductToCard(req, res) { 
  try {
    req.logger.debug('entro al deleteProductToCard');
           
        const cId = req.params.cId;
        const pId = req.params.pId;
        let result = await cartsService.deleteProductToCart(cId,pId);
       
        if (!result) {
          return res
            .status(404).send({
            status: "error",
            error: "Could not delete producto to cart. No cart found in the database",
          });
        }
        return res.send({
            status: "success",
            message: "Delete product to cart",
            payload: result,
          });  

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  ////////////////////////////////////////////////////////////////////////////////////////////////
//actualizar la cantidad de unidades de un producto que se encuentra en el carrito
export function updateQuantitytoProductToCart(req, res) { 
  try { 
    req.logger.debug('entro al updateQuantitytoProductToCart');
    const cId = req.params.cId;
    const pId = req.params.pId;
    const pquantity = req.body;
    
    let result =  cartsService.updateQuantitytoProductToCart(cId,pId,pquantity);
    if (!result) {
      return res
        .status(404).send({
        status: "error",
        error: "Could not update quantity to producto to cart. No cart found in the database",
      });
    }
      return res.send({
        status: "success",
        message: "update quantity to product  to cart",
        payload: result,
      }); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    } 
 
};
 //////////////////////////////////////////////////////////////////////////////////////
//PUT actualiza el carrito con un arreglo de productos
export function updatetoListProducToCart(req, res) { 
  try {
    req.logger.debug('entro al updatetoListProducToCart');
    const cId = req.params.cId;   
    var listproduc = new Array();       
     if (req.body) 
          listproduc = req.body;   
      else {
          
          listproduc = [{"quantity": 1, "pId": cId }];   
      }        

    let result =  cartsService.updatetoListProducToCart(cId,listproduc);
    if (!result) {
      return res
        .status(404).send({
        status: "error",
        error: "Could not delete cart. No cart found in the database",
      });
    }    
    return res.send({
        status: "success",
        message: "update car to  array product  to cart",
        payload: result,
      });  
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
};
  ////////////////////////////////////////////////////////////////////
  export async function purchase(req, res) {
    try {
      req.logger.debug('entro al purchase'); 
        const cId = req.params.cId;    
        console.log("purchase carts.controller" , cId);
        const ticket = await ticketService.createTicket(cId);
        return res.send({ status: "success", payload: ticket });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};