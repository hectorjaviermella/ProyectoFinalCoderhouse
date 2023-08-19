import  TicketService  from "../services/tickets.service.js";


import  CartsService  from "../services/carts.service.js";
import  ProductsService  from "../services/products.service.js";


const ticketService = new TicketService();
//////////////////////////////////////////////////////////////////////////////////////////////
export async function getTicketsById(req, res) {
  try {
  
    const tId = req.params.pId;    
    const ticket = await ticketService.getTicketsById(tId);
    if (!ticket) {
        return res
          .status(400)
          .send({ status: "error", error: "No se pudo encontrar el ticket" });
      }
    return res.send({ status: "success", payload: ticket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  }

//////////////////////////////////////////////////////////////////////////////////////////////
  export async function createTicket(req, res) {
    try {
      
        const cId = req.params.cId;    
        const ticket = await ticketService.createTicket(cId);
        return res.send({ status: "success", payload: ticket });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
//////////////////////////////////////////////////////////////////////////////////////////////
export async function getTickets(req, res) {
  try {
     
    const tickets = await ticketService.getTicket();
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

//////////////////////////////////////////////////////////////////////////////////////////////
