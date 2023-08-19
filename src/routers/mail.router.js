//import nodemailer from "nodemailer";
import { Router } from "express";
import  {sendEmail} from "../controllers/mail.controller.js";

import __dirname from "../utils.js";


export const mailRouter = Router();
//////////////////////////////////////////////////////////////////////////////////////////////

mailRouter.get("/mail",sendEmail);



//////////////////////////////////////////////////////////////////////////////////////

export default mailRouter;