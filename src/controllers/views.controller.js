import  CartsService from "../services/carts.service.js";
import  TicketService from "../services/tickets.service.js";
import  UsersService from "../services/users.service.js";
import UserDTO from "../daos/dtos/user.dto.js";
import TicketDTO from "../daos/dtos/ticket.dto.js";
import { createHash, isValidPassword, transport } from "../utils.js";
import { userModel } from "../daos/mongo/model/user.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

import  PaymentService  from "../services/payments.js";
import { productRepository, userRepository } from "../repositories/index.js";

const cartsService = new CartsService();
const ticketService = new TicketService();
const usersService = new UsersService();



//////////////////////////////////////////////////////////////////////////////////////////////

export function login(req, res) {

  res.render("login");
};

//////////////////////////////////////////////////////////////////////////////////////////////
export function register(req, res) {
  res.render("register");
};
//////////////////////////////////////////////////////////////////////////////////////////////

export function current(req, res) {
  
  
  const userToSave = new UserDTO(req.session.user);

  res.render("profile", { user: userToSave });
};

//////////////////////////////////////////////////////////////////////////////////////////////
export function inicio(req, res) {
  res.render("login");
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//muestra todo los productos 
export async function getProducts(req, res) {
   
   req.logger.debug('Entro al getProducts');

   let {limit =10 , page =  1, pCategory, pStatus, sort} = req.query; 
   
  let query ={
    pCategory: pCategory || { $exists: true },
    pStatus: pStatus || { $exists: true },
  }; 
    
  if (sort===1)
  sort={ pPrice:-1};
else
  sort={ pPrice:-1};  
 

 const { docs: productos,  hasPrevPage,  hasNextPage,  nextPage,  prevPage,  totalPages,
} =  await productRepository.getProducts(query,limit,page,pCategory,pStatus,sort); 


return res.render("products", { user:req.session.user , productos,  page,  hasPrevPage,  hasNextPage,  prevPage,  nextPage,  totalPages,});
};

/////////////////////////////////////////////////////////////////////////////////////
export async function getCartsById(req, res) {  
  const { cId } = req.params; 
    const cart =  await cartsService.getCartsById(cId);
  res.render("cart", { cart: cart ,  user:req.session.user });
};
//////////////////////////////////////////////////////////////////////////////////////////////
export async function ticket(req,res){
      req.logger.debug('Entro al ticket');
      const { cId } = req.params; 
    const ticket= await ticketService.createTicket(cId);
      req.logger.debug('Entro al createTicket' ,ticket); 
      const ticketToSave = new TicketDTO(ticket);
      res.render("ticket",  { ticket: ticketToSave});
}
//////////////////////////////////////////////////////////////////////////////////////////////
export function restore(req, res) {
  res.render("restore");
};

//////////////////////////////////////////////////////////////////////////////////////////////////////

export async function restablecer(req, res) {
  const  token  = req.params.cId;
  req.session.token=token; 
  res.render("restablecer");

 
};
//////////////////////////////////////////////////////////////////////////////////////////////////////
export async function recuperacion(req, res) {
  try {

     
     const { email } = req.body;

     // Buscar al usuario por correo electrónico
       const user = await userModel.findOne({ email }).lean();

       if (!user) {
        // Usuario no encontrado, manejo del error
        // return res.redirect('/');
        return res.send({ status: "error", result: "User no encontrado" });
      }      
      
     // Generar el token con tiempo de expiración (1 hora)
      const token = jwt.sign({ email }, config.sessionSecret, { expiresIn: '1h' });

       // Actualizar los campos de resetToken y resetTokenExpiration en el documento del usuario
      user.resetToken = token;
     user.resetTokenExpiration = Date.now() + 36000; //  en milisegundos
     
   
     const userac = await userModel.updateOne(user);    

  // Envío de correo 
    const resetUrl = `http://localhost:8080/restablecer/${token}`; 
  
 
        let result = await transport.sendMail({
         from: "hectorjaviermella@gmail.com",      
         to: email,      
         subject: "Mail de recuperacion de contrasena",
         html: `
         <a href="${resetUrl}">
         <button>Recuperacion</button>
       </a>  `,
    
          });

  
   return res.send({ status: "success", result: "mail sent" });
  
  } catch (error) {
    console.log(error);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////
   export async function reset(req, res) {
    try {           
    const {  password  } = req.body; 
    const newPassword = password;
    const  token  =   req.session.token;     
    // Verificar el token y obtener el correo electrónico del payload
    const decodedToken = jwt.verify(token,  config.sessionSecret);
    const { email } = decodedToken;
  
     // Buscar al usuario por correo electrónico y verificar si el token es válido y no ha expirado
     const user = await userModel.findOne({ email }).lean();
    
  
     if (!user || user.resetToken !== token || user.resetTokenExpiration < Date.now()) {
       // Token inválido o expirado, manejo del error
       
       //return res.redirect('/');
       return res.send({ status: "novalidolink", result: "expiro el link" });
     }


     //if (user.password != newPassword){

      if (!isValidPassword(user, newPassword)) {
     
  
      // Actualizar la contraseña del usuario y borrar el token y la fecha de expiración
      user.password = createHash(newPassword) ;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      
      const userac = await userModel.updateOne(user);

   
      // Redirigir a la página de inicio de sesión o mostrar un mensaje de éxito
    //  res.redirect('/login');
      
      return res.send({ status: "success", result: "password reset ok" });

     }
     else{
       //console.log("no puede guardar la misma password ");
       return res.send({ status: "mismapass", result: "no puede guardar la misma password " });

     }

    } catch (error) {
      console.log(error);
    }
  
  
  };


//////////////////////////////////////////////////////////////////////////////////////////////////////


//generar un nuevo producto
export async function newproduct(req, res) {
  req.logger.debug('Entro a newproducto');
 
  if(!req.user)
       res.render("login");
       
  ///const pId = req.params.pId; 
 // const cId = req.user.cart; 
  //  const prod =   await productRepository.getProductsById(pId);
   
   // res.render("product", { prod, cId });
  
   res.render("newproduct");
};


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//muestra un producto
export async function getProductsById(req, res) {
  try {   

  if(req.user.cart===undefined)
       res.render("login");

  const pId = req.params.pId; 
  const cId = req.user.cart; 
    const prod =   await productRepository.getProductsById(pId);
   
    res.render("product", { prod, cId });
  } catch (error) {
    console.log(error);
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//muestra todo los usuarios 
export async function getUsers(req, res) { 
  try {   

  let {limit =4 , page =  1, role,  sort} = req.query; 
  
 let query ={
   role: role || { $exists: true },
 }; 
   
 if (sort===1)
 sort={ pPrice:-1};
else
 sort={ pPrice:-1};  


const { docs: users,  hasPrevPage,  hasNextPage,  nextPage,  prevPage,  totalPages,
} =  await usersService.getUsers(query,limit,page,sort); 

return res.render("users", { user:req.session.user , users,  page,  hasPrevPage,  hasNextPage,  prevPage,  nextPage,  totalPages,});
} catch (error) {
  console.log(error);
}

};

///////////////////////////////////////////////////////////////////////////////////
//muestra un usuario
export async function getUsersById(req, res) {
  try {  

 // req.logger.debug('Entro al getUsersById' ); 
  if(req.user.cart===undefined)
       res.render("login");

  const uId = req.params.uId; 
  
    const user =   await userRepository.getUsersById(uId);
    
   // console.log("user individual " , user);
    res.render("user", { user, uId });

  } catch (error) {
    console.log(error);
  }

};
///////////////////////////////////////////////////////////////////////////////////////

export async function switchRol(req, res) {
  
  try {

     const uid = req.params.uid;   
      const usertoupdate =  await usersService.getUserById(uid);
      
      if (!usertoupdate) {
        return res
        .status(400)
        .send({ status: "error", error: "Incomplete values is product" });
      }

      const listadoc = usertoupdate.documents;

     
      let contador = 0;
      if (listadoc){

      
       ///verifico que tenga cargados los documentos para pasar a premiun el usuario

        listadoc.forEach( files =>{
        
            if (files.name.includes("identificacion")) {
                 contador=contador + 1;
               
            }

            if (files.name.includes("comprobante de domicilio")) {
              contador=contador + 1;
           
            }

            if (files.name.includes("comprobante de estado de cuenta")) {
              contador=contador + 1;
            
            }
             
          });   
       } 
  
    //encuentra al primero que cumple la condicion id
    if (usertoupdate.role==='user' && contador===3){
        //  console.log("entro a cambiar 1");
          usertoupdate.role='premium';
       }
    else{
      if (usertoupdate.role!='premium'){
            return res
          .status(400)
          .send({ status: "error", error: "El usuario no termino de cargar los documentos" });
      }
    }

    if (usertoupdate.role==='premium'  && contador!=3){
     
          usertoupdate.role='user';
    }
    
    
        

    const result = await usersService.updateUser(uid,usertoupdate);
    return res.send({ status: "success", payload: result });
  } catch (error) {
  // req.logger.debug(error.message); 
    console.log(error);
  }
};




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//muestra todo ticket para pagar del usuario 
export async function getTicketByUser(req, res) { 
  try {   
  let purcharser = req.params.uId; 
let  tickets = await ticketService.getTicketsByUser(purcharser); 
return res.render("payments", { user:req.session.user , tickets});
} catch (error) {
  console.log(error);
}

};

/////////////////////////////////////////////////////////////////////
export function creditCard(req, res) {
  res.render("creditCard");
};
/////////////////////////////////////////////////////////////////////
export async function payment(req, res) {
  try {
     
      let tId =req.query.id;  
      const requestedTicket =  await ticketService.getTicketsById(tId);
    
     if (!requestedTicket) {
            return res.status(404).send({ status: "error", error: "No se encontro el ticket" });
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
     let paymentIntentId = await service.createPaymentIntent(paymentIntentInfo);  
   
    return res.render("creditCard" , {paymentIntentId , tId});
 
      } catch (error) {
   
          console.log(error);
      }
   
 };
 ////////////////////////////////////////////////////////////////////////////////////
 export async function processpayment(req, res) {
   try {    
    const user = req.session.user
    const token = req.body.token;
    const {paymentIntentId, tId} = req.body;  
     const service = new PaymentService();
     
     ///cambiar estado de ticket
    // ticketService
         let ticket =  await ticketService.getTicketsById(tId);
         let result = await service.processpayment(token,paymentIntentId,user,ticket);    
         if (!ticket) {
          return res.status(404).send({ status: "error", error: "No se encontro el ticket" });
        }
        ticket.pagado=true;
        const resultupdate =  await ticketService.updateTicket(tId,ticket);
      
    
     if ((result === 'succeeded') &&   (resultupdate === 'succeeded')) {        
     res.json({ success: true, message: 'Pago exitoso' });

  } else {        
     res.json({ success: false, message: 'Error en el pago' });
   
  }
 
  } catch (error) {
      console.error(error);
    
  }
};
///////////////////////////////////////////////////////

export function info(req, res) {
  console.log("llego al info");
  res.render("info");
};
