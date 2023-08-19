import { Router } from "express";
import  {getTickets,getTicketsById} from "../controllers/tickets.controller.js";

import __dirname from "../utils.js";

import { uploadDocuments} from "../dirname.js";


export const ticketsRouter = Router();

//////////////////////////////////////////////////////////////////////////////////////
//busca todos los tickets con estado pagado false
ticketsRouter.get("/", getTickets);


///////////////////////////////////////////////////////////////////////////////////////////////
//busca un ticket por id
ticketsRouter.get("/:pId",getTicketsById);


export default ticketsRouter;

