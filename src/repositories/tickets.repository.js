export default class TicketsRepository {
    constructor(dao) {
      this.dao = dao;
    }
       async getTickets(){
          try {
           
            //console.log("estoy tickets.repositori en getTickets: " , this.dao);
        
            let tickets=0;              
         
            tickets = await this.dao.getTickets();         
             
            return tickets;
          } catch (error) {
              throw new Error('Error retrieving ticket from the database.');
          }
        };
  
  //////////////////////////////////////////////////////////////////////////  
  async getTicketsById(tId){
      try {
        console.log("entro a procuts.repository al getProductsById " + tId);
        const tickets = await this.dao.getTicketsById(tId);
        return tickets;
      } catch (error) {
        console.log(error);
      }
    };

      //////////////////////////////////////////////////////////////////////////  
  async getTicketsByUser(purcharser){
    try {
        const tickets = await this.dao.getTicketsByUser(purcharser); ;
      return tickets;
    } catch (error) {
      console.log(error);
    }
  };
  
  /////////////////////////////////////////////////////////////////////////  
  async createTicket(ticket){
      try {
        console.log("tickets.repository en el createTicke");
        const createTicket = await this.dao.createTicket(ticket);
        return createTicket;
      } catch (error) {
        console.log(error);
      }
    };
  
  
  /////////////////////////////////////////////////////////////////////////////////
  async deleteTicket(tId){
      try {
          let result = await  this.dao.deleteTicket( tId);
        return result;
      } catch (error) {
        console.log(error);
      }
    };
  /////////////////////////////////////////////////////////////////////////////////////
  async updateTicket(tId,ticketnuevo){
      try {
        const createTicket = await this.dao.updateTicket(tId , ticketnuevo);
        return createTicket;
      } catch (error) {
        console.log(error);
      }
    };
  
    }  
   
   