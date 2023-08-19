import config from "../config/config.js";
import { logger  } from "../utils/logger.js";

export const addLogger = (req, res, next) => { 
  ////////development
  if (config.environment==="development"){
    req.logger = logger;
      req.logger.debug(
        `${req.method} en ${req.url} - ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}` 
      );
      next();
  }  
  /////////////producction
  if (config.environment==="production"){ 
    req.logger = logger;
    req.logger.info(
      `${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`
    );
    next();
}
};
