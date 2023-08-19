import nodemailer from "nodemailer";
import __dirname from "../utils.js";
import configMailSms from "../configmailsms.js";

const {
    nodemailerConfig: { service, port, user, password,mail_receptor},
  } = configMailSms;


  let transport = nodemailer.createTransport({
    service: service,
    port: port,
    auth: {
        user: user,
        pass: password
    },
    tls: {
        rejectUnauthorized: false
    }
});

export default class MailsService {
    constructor() {}
  

/////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////
 async  sendEmail(email,psubject,phtml){
    try {
         console.log("entro a sendemail mail.service" , email);       
   
    //const email=req.session.user.email;

       let result = await transport.sendMail({
        from: user,      
        to: email,              
        subject: psubject,
        html: phtml
        /*,
        attachments: [{
            filename: 'aguasaborizada.jpg',
            path: `${__dirname}/public/images/aguasaborizada.jpg`,
            cid: 'miemail',
        }]*/
    });
   
 
 
 return result;
   } catch (error) {
    console.log(error);
  }
};

}
/////////////////////////////////////////////////////////////////////////////////////
