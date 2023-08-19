import mongoose from "mongoose";
import config from "../config/config.js";
export let productDAO;
export let cartDAO;
export let userDAO; 
export let ticketDAO; 
switch (config.persistence) {
  case "MONGO":
  
    mongoose.connect(config.dbUrl);
    const { productMongo } = await import("./mongo/product.mongo.js");
    const { cartMongo } = await import("./mongo/cart.mongo.js");
    const { userMongo } = await import("./mongo/user.mongo.js");
    const { ticketMongo } = await import("./mongo/ticket.mongo.js");
    productDAO = productMongo;
    cartDAO = cartMongo;
    userDAO = userMongo;
    ticketDAO = ticketMongo;
    break;

  case "MEMORY":
    const { productMemory } = await import("./memory/product.memory.js");
    const { cartMemory } = await import("./memory/cart.memory.js");
    const { userMemory } = await import("./memory/user.memory.js");
    productDAO = productMemory;
    cartDAO = cartMemory;
    userDAO = userMemory;
    break;
}