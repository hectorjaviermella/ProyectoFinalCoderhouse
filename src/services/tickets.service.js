import { ticketRepository } from "../repositories/index.js";
import { cartRepository } from "../repositories/index.js";
import { productRepository } from "../repositories/index.js";
import { userRepository } from "../repositories/index.js";
import { faker } from '@faker-js/faker';

import TicketDTO from "../daos/dtos/ticket.dto.js";

export default class TicketService {
  constructor() {}

///////////////////////////////////////////////////////////

 async getTicket() {
  
    const tickets = await ticketRepository.getTickets();
 
    return tickets;
  }

////////////////////////////////////////////////////////////////////////
async getTicketsById(tId) {
    const ticket = await ticketRepository.getTicketsById(tId);
    return ticket;
  }
 ////////////////////////////////////////////////////////////////////////
async getTicketsByUser(purcharser) { 
  const tickets = await ticketRepository.getTicketsByUser(purcharser); 

  return tickets;
}
////////////////////////////////////////////////////////////////////////
async updateTicket(tId,ticketnuevo) {
    const updateTicket =  await ticketRepository.updateTicket(tId,ticketnuevo);
    let result=null;

    if (updateTicket.acknowledged ) {
      result = 'succeeded'; 
 } else result = 'El ticket no pudo modificarse';

    return result;
  }
////////////////////////////////////////////////////////////////////////

async deleteTicket(tId) {
    const result = await ticketRepository.deleteTicket(tId);
    return result;
  }
  




  //////////////////////////////////////////////////////////////////////////////////////////////
  async createTicket(cId) {
    try {
        

        // Genera un código de cadena único utilizando Faker.js
          //const codigoUnico = faker.random.uuid();
          const codigoUnico = faker.lorem.word();

        //recuperar el carrito con los productos 
        const cart = await cartRepository.getCartsById(cId);        
      
        const user = await userRepository.getUsersByCartId(cId);  
    
                
        let productscar = cart.products;
       
       let amount=0;
    
      const  arrayproductsnocomprados = [];
      const  arrayproductscomprados = [];
     
       //recorro los productos del carrito
       for (let i = 0; i < productscar.length; i++) {
     
        let productcar = productscar[i];     
 
        //recupero el producto original
        let valor = productcar.pId._id;
  
        let productstock = await productRepository.getProductsById(valor); 

  
        //comparo stock
       if ((productstock.pStock - productcar.quantity)>=0){
                //hay stock para la venta
         productstock.pStock = productstock.pStock - productcar.quantity;
       
         //actualizo el stock 
         const resultupdate= await productRepository.updateProducto(productstock._id,productstock);
        

         //sumo cantidad de valor de producto por la cantidad pedida
         amount= amount + (productstock.pPrice *  productcar.quantity);
        
         //eliminar del carrito el producto

         const resultdelete  = await cartRepository.deleteProductToCart(cId,productstock._id);
     
         arrayproductscomprados.push(productcar.quantity + " unidades " + productcar.pId.pTitle);   
         
      
       }else
       {
         //no hay stock para la venta
         arrayproductsnocomprados.push(productcar.pId.pTitle);       

       }

      }//cierra el for
  
   
      if (arrayproductscomprados.length>0){   
                 
                let purcharser =user.email;
              
                const ticket = {
                            cId: cId,
                            code: codigoUnico,                 
                            amount: amount ,
                            purcharser: purcharser,
                            arrayproductscomprados:arrayproductscomprados,
                            arrayproductsnocomprados:arrayproductsnocomprados,

                };
             
                const createdTicket = await ticketRepository.createTicket(ticket);
                                
                
                if (!createdTicket) {
                  //no se creo el carrito.
                return res
                  .status(400)
                  .send({ status: "error", message: "Error to create ticket",payload: error });
              }else{
           
                 return createdTicket;
              
              }


             
                                }else{
                             return res.send({ status: "error", message: "Do not ticket created", payload: error});
              
                                }
    } catch (error) {
       return error;
    
    }
};
////////////////////////////////////////////////////////////////////////

}