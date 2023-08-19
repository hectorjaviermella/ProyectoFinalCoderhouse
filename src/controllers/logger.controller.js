import __dirname from "../utils.js";

import { logger  } from "../utils/logger.js";


/////////////////////////////////////////////////////////////////////
export async function loggerTest(req,res){
    try {
             
      
        req.logger.debug("This is a debug log");
        req.logger.http("This is an HTTP log");
        req.logger.info("This is an info log");
        req.logger.warning("This is a warning log");
        req.logger.error("This is an error log");
        req.logger.fatal("This is a fatal log");
    
        res.send("Logger test completed");
   
} catch (error) {
    res.status(500).json({ error: error.message });
  };
};


