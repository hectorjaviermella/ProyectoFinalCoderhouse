import dotenv from "dotenv";
dotenv.config();
/*import { Command } from "commander";
const program = new Command();

program
  .requiredOption(
    "--mode <mode>",
    "environment",

    "environmant has not been specified"
  )
  .parse();

const { mode } = program.opts();

console.log("xxmodexx ", mode);

dotenv.config({
    path: mode === "production" ? "./.env.production" : "./.env.development",
});
*/
/*

if (mode === 'development') {
  console.log('Running in development environment.');
  const config = {
    persistence : process.env.development.PERSISTENCE,   
    dbUrl : process.envdevelopment.DB_URL,
    sessionSecret: process.envdevelopment.SESSION_SECRET,
   
    clientID: process.envdevelopment.CLIENT_ID,
    clientSecret: process.envdevelopment.CLIENT_SECRET,
    callbackUrl: process.envdevelopment.CALLBACK_URL,
    environment: mode,
   };

  //process.env.SOME_VARIABLE = 'Development Value';
} else if (mode === 'production') {
  console.log('Running in production environment.');
  const config = {
    persistence : process.env.production.PERSISTENCE,   
    dbUrl : process.env.production.DB_URL,
    sessionSecret: process.env.production.SESSION_SECRET,
   
    clientID: process.env.production.CLIENT_ID,
    clientSecret: process.env.production.CLIENT_SECRET,
    callbackUrl: process.env.production.CALLBACK_URL,
    environment: mode,
   };


  //process.env.SOME_VARIABLE = 'Production Value';
} else {
  console.error('Invalid environment specified.');
  process.exit(1);
}
*/


const config = {
 persistence : process.env.PERSISTENCE,   
 dbUrl : process.env.DB_URL,
 sessionSecret: process.env.SESSION_SECRET,
 port: process.env.PORT_SERVER || 3000,
 clientID: process.env.CLIENT_ID,
 clientSecret: process.env.CLIENT_SECRET,
 callbackUrl: process.env.CALLBACK_URL,
 
environment: process.env.DEV_MODE
};




export default config;