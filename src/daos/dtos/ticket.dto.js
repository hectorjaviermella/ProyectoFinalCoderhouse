export default class TicketDTO {
    constructor(ticket) {
      this._id = ticket._id;
      this.code = ticket.code; 
      this.amount =  ticket.amount;     
      this.purchase_datetime  = ticket.purchase_datetime;
      this.arrayproductscomprados= ticket.arrayproductscomprados;
      this.arrayproductsnocomprados= ticket.arrayproductsnocomprados;
      
    }
  }