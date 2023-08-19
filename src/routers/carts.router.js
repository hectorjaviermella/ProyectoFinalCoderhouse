
import { Router } from "express";
import { checkPermisosUsuario } from "../middlewares/auth.js";
import { getCardId, createCart,addProductToCart,deleteCardId,deleteProductToCard,updateQuantitytoProductToCart,updatetoListProducToCart,purchase} from "../controllers/carts.controller.js";
import {getTicketsById,createTicket } from "../controllers/tickets.controller.js";


export const cartsrouter = Router();


//////////////////////////////////////////////////////////////////////////////////////////////
//recupera un carrito
cartsrouter.get("/:cId", getCardId);
//////////////////////////////////////////////////////////////////////////////////////
//elimina un carrito
cartsrouter.delete("/:cId", deleteCardId);
//////////////////////////////////////////////////////////////////////////////////////
//PUT actualiza el carrito con un arreglo de productos
cartsrouter.put("/:cId", updatetoListProducToCart);
//////////////////////////////////////////////////////////////////////////////////////////////
//crea un carrito vacio
cartsrouter.post("/", createCart);

 ////////////////////////////////////////////////////////////////////////////////////////////////
//actualizar la cantidad de unidades de un producto que se encuentra en el carrito
cartsrouter.put("/:cId/product/:pId", updateQuantitytoProductToCart);

/////////////////////////////////////////////////////////////////////////////////////////////
//agregar  un producto al  carrito
cartsrouter.post("/:cId/product/:pId",addProductToCart);
////////////////////////////////////////////////////////////////////////////////////////////////
//elimina un producto del carrito especifico
cartsrouter.delete("/:cId/product/:pId", deleteProductToCard);
//////////////////////////////////////////////////////////////////////////////////////
//Crea  un ticket de la compra de un  carrito
cartsrouter.get("/:cId/purchase",purchase);



export default cartsrouter;