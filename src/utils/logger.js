import winston from "winston";
import  __dirname  from "../dirname.js";
import config from "../config/config.js";

const customLevelOptions = {
  levels: {
    fatal: 5,
    error: 4,
    warning: 3,
    info: 2,
    http: 1,
    debug: 0,
  },
  colors: {
    fatal: "red",
    error: "orange",
    warning: "yellow",
    info: "blue",
    http: "white",
    debug: "green",
  },
};
//logger de desarrollo
const developmentLogger  = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console({
      //level: "debug", //va mostrar todos porque es a partir del nivel debug que es mi nivel mas bajo
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOptions.colors }),
        winston.format.simple()
      ),
    }),    
    new winston.transports.File({
      filename: `${__dirname}/../logs/errors.log`,
     // level: "error",
      format: winston.format.simple(),
    }),
  ],
});

//logger de produccion
const productionLogger  = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: `${__dirname}/../logs/errors.log`,
      level: "error",
      format: winston.format.simple(),
    }),
  ],
});

//console.log("logger.js" , config.environment);
const logger = config.environment === false ? productionLogger : developmentLogger;
//console.log("logger.js" , logger);
export { logger };

