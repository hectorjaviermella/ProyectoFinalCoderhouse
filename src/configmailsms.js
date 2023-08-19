import dotenv from "dotenv";
dotenv.config();

export default {
  nodemailerConfig: {
    service: process.env.SERVICE,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    mail_receptor:process.env.MAIL_RECEPTOR
  },
 /* twilioConfig: {
    accountSid: process.env.ACCOUNT_SID,
    authToken: process.env.AUTH_TOKEN,
    phoneNumber: process.env.PHONE_NUMBER,
  },*/
};