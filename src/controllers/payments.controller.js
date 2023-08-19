import  PaymentService  from "../services/payments.js";

import  TicketsService  from "../services/tickets.service.js";
const ticketsService = new TicketsService();
/*
const products =[
    {id:1 ,  name: "papas" , price:1000},
    {id:2 ,  name: "choclo" , price:1500},
    {id:3 ,  name: "papas" , price:2000},
    {id:4 ,  name: "verengena" , price:2500},
    {id:5 ,  name: "naranja" , price:2600},
    {id:6 ,  name: "zapallo" , price:2400},
 
 
 
 ];*/
////////////////////////////////////////////////////////////////////////////////////
export async function payment(req, res) {
    try {
        console.log("entro a payment router" , req.query.id);
        let tId =req.query.id;
      /*  const requestedProduct = products.find(
            (product) => product.id === parseInt(req.query.id)
        );*/
        const requestedTicket =  await ticketsService.getTicketsById(tId);
      // console.log(" xxx ticket recuperado " ,  requestedTicket);
       if (!requestedTicket) {
              return res.status(404).send({ status: "error", error: "No se encontro el producto" });
         }

    
      
    let   elementoscomprados="";
      for (let i = 0; i < requestedTicket.arrayproductscomprados.length; i++) {
        elementoscomprados= elementoscomprados + " " +  requestedTicket.arrayproductscomprados[i] ;
      }
       
       //armar el dato'
        const paymentIntentInfo = {
            amount:  requestedTicket.amount,
            currency: "usd",
            metadata:{
                ticketId: requestedTicket.id,
                orderDetail: elementoscomprados,
                address: "raul soldi 12, neuquen , Argentina",
                purcharser: requestedTicket.purcharser,
                purchase_datetime:requestedTicket.purchase_datetime,

            }
        };

 

       const service = new PaymentService();
       let result = await service.createPaymentIntent(paymentIntentInfo);
     // console.log(result);
      // res.send({status:"success", payload:result});
      console.log("tendria que renderizar");
      res.render("creditCard" , {result});
  
        } catch (error) {
         // req.logger.debug(error.message); 
            console.log(error);
        }
     
   };
   ////////////////////////////////////////////////////////////////////////////////////////////
   export async function paymentUser(req, res) {
    try {
       
      const tickets = await ticketsService.getTicket();
      
      if (!tickets) {
          return res
            .status(400)
            .send({ status: "error", error: "No existen ticket" });
        }
      return res.send({ status: "success", payload: tickets });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    }