import Stripe from "stripe";

import  MailsService  from "../services/mails.service.js";
const mailsService = new MailsService();

export default class PaymentService {

  constructor(){

    this.stripe = new  Stripe(
      "sk_test_51Na5XIFIy5BqTdQVgloczkMsPKCVxPJ3kFSnzZj0KszhBEvIvjzR5BoVxY9OFGwDg7iyPDssfnNyLRL2ZoaWsPcS0035RkvE6h"
    );    
  }
  
  createPaymentIntent = async(data) => {
    const paymentIntent =  await this.stripe.paymentIntents.create(data);
    return paymentIntent;

 };

 processpayment  = async(tokent, paymentIntentId,user,ticket) => {
   try {  
      
       const token = tokent.id; // Token de la tarjeta 
       // Crear un PaymentMethod a partir del token
       const paymentMethod = await this.stripe.paymentMethods.create({
           type: 'card',
           card: {
               token: token
           },
           billing_details: {
            name: user.first_name,
            email: user.email,
        },
       });
    
       // Asociar el PaymentMethod al payment_intent
       const paymentIntent = await this.stripe.paymentIntents.update(paymentIntentId, {
           payment_method: paymentMethod.id
       });

let result=null;
// Confirmar el payment_intent
await this.stripe.paymentIntents.confirm(paymentIntentId)
    .then(paymentIntent => {
        if (paymentIntent.status === 'succeeded') {
             result = 'succeeded'; 
        } else if (paymentIntent.status === 'requires_confirmation') {
           result = 'Se requiere confirmación adicional';  
            
        } else {
           result = 'El pago no pudo ser completado'; 
        }
    })
    .catch(error => {
        console.error('Error al confirmar el payment_intent:', error);
    });
//envia email si fue exitoso el pago
if (result === 'succeeded'){
     let psubject = `Se pudo pagar el ticker   ${ticket.code} - purcharser:  ${ticket.purcharser} `;     
     let phtml = `Se pago el ticket con monto ${ticket.amount} -tid: ${ticket._id} `
     mailsService.sendEmail(ticket.purcharser,psubject , phtml);
}

   return result;    

   } catch (error) {
       console.error(error);
      // res.status(500).json({ error: 'Error al procesar el pago' });
   }
 };
 

}