import { ticketModel } from "./model/ticket.js";

class Ticket {
  constructor() {}
  
 //////////////////////////////////////////////////////////////////
  getTickets = async () => {
 
   const tickets = await ticketModel.find();    
    return tickets;
  };
/////////////////////////////////////////////////////////////////////////
  getTicketsById = async (tId) => {
    try {  
    const ticket = await ticketModel.findById({ _id: tId ,lean:true }).lean();
  
    return ticket;
  } catch (error) {
    console.log(error);
  }
  };

  /////////////////////////////////////////////////////////////////////////
  getTicketsByUser = async (purcharser) => {
    try {   
      //consulta por usuario y ticket no pagados
      let query ={
        pagado: false && { $exists: true },
        purcharser:purcharser  && { $exists: true},
       
      };  

    
       let tickets = await ticketModel.find(query).lean(); 
     
    return tickets;
  } catch (error) {
    console.log(error);
  }
  };
//////////////////////////////////////////////////////////////////////////
  createTicket = async (ticket) => {
    try {
    const createdTicket = await ticketModel.create(ticket);
    return createdTicket;
   } catch (error) {
    console.log(error);
  }
  };
  /////////////////////////////////////////////////////////////////////////////////////
  updateTicket = async (tId,ticketnuevo) =>{
    try {
      const createTicket = await ticketModel.updateOne({ _id: tId }, ticketnuevo);
      return createTicket;
    } catch (error) {
      console.log(error);
    }
    };
}

export const ticketMongo = new Ticket();