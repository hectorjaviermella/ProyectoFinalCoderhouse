import { Router } from "express";
import  {payment,paymentUser} from "../controllers/payments.controller.js";

import __dirname from "../utils.js";

import { uploadDocuments} from "../dirname.js";


export const paymentsRouter = Router();




//////////////////////////////////////////////////////////////////////////////////////
//intento de pago
//paymentsRouter.post("/payment-intents",payment);

//////////////////////////////////////////////////////////////////////////////////////
//mostrar todo los pagos por hacer del usuario
//paymentsRouter.post("/payments-user",paymentUser);




//////////////////////////////////////////////////////////////////////////////////////

export default paymentsRouter;

