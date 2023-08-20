import nodemailer from "nodemailer";
import __dirname from "../utils.js";
import configMailSms from "../configmailsms.js";
import  MailsService  from "../services/mails.service.js";
const mailsService = new MailsService();


/////////////////////////////////////////////////////////////////////

export async function sendEmail(req,res){
    try {
      //  req.logger.debug('Entro al sendEmail xx mail.controller mock');
       
    const email="hectorjaviermella@gmail.com";
   
     const psubject="envio de email";
     const phtml ="envio de email mock";
    let result =  await mailsService.sendEmail(email,psubject,phtml);
    
    return result;
    
} catch (error) {
    res.status(500).json({ error: error.message });
  };
};



/////////////////////////////////////////////////////////////////////
