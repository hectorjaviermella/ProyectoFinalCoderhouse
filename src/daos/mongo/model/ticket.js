import mongoose from "mongoose";

const ticketCollection = "Tickets";

const ticketSchema = new mongoose.Schema({
  //code string debe autogenerarse y ser unico
  code: {
    type: String,
    unique: true,
  },
  //purchase_datetime debe guardar fecha y hora exacta cuando se realizo la compra
  purchase_datetime: {
    type: Date,
    default: Date.now // Establece el valor por defecto como la fecha y hora actual
  }, 
  //amount total de la compra
  amount: Number,
  //purcharser contendra el correo del comprador
  purcharser: String,
  purchase_datetime: {
    type: Date,
    default: Date.now // Establece el valor por defecto como la fecha y hora actual
  }, 
 
  arrayproductscomprados: {
    type: [String], 
    
  },
  arrayproductsnocomprados: {
    type: [String],     
  },
  pagado: { type: Boolean, default: false }
});



export const ticketModel = mongoose.model(ticketCollection, ticketSchema);