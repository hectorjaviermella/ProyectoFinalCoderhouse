import __dirname from "./dirname.js";
import cors from "cors";
import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
//import morgan from "morgan";
import swaggerJSdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

import { logger  } from "./utils/logger.js";
import { addLogger } from "./middlewares/addLogger.js";



import passport from "passport";
import initializePassport from "./auth/passport.js";
//import  swaggerOptions  from "./utils.js";
import database from "./db.js";
import config from "./config/config.js";

import sessionsRouter from "./routers/sessions.router.js";
import viewsRouter from "./routers/views.router.js";
import productsRouter  from "./routers/products.router.js";
import cartsrouter  from "./routers/carts.router.js";

import mailRouter from './routers/mail.router.js';
import usersRouter from './routers/users.router.js';
import paymentsRouter from './routers/payments.router.js';
import ticketsRouter from './routers/tickets.router.js';

import loggerRouter from './routers/logger.router.js';

//manejador de errores
import errorHandler from "./middlewares/errors/index.js";

import socket from "./socket.js";
import mongoose from "mongoose";

//import { routerApi } from "./routers/index.js";

export const swaggerOptions ={
  definition: {
    openapi: "3.0.1",
    info: {
       title: "API CART MELLA",
       description: "Api de  venta de productos, con un carrito por Usuario",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`]
};
const specs = swaggerJSdoc(swaggerOptions);

// initialization
const app = express();
app.use(cors());
// middlewares
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
//app.use(morgan("dev"));

app.use(addLogger);

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.dbUrl,
      ttl: 500,
    }),
    resave: true,
    saveUninitialized: false,
    secret: config.sessionSecret,
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// view engine
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// database connection
database.connect();

// routes
//routerApi(app);

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsrouter);
app.use("/api/sessions", sessionsRouter);
app.use("/", viewsRouter);
app.use("/mail", mailRouter);
app.use("/loggerTest", loggerRouter);
app.use("/api/users", usersRouter);
app.use("/api/tickets", ticketsRouter);
app.use("/api/payments" , paymentsRouter);

//manejador de errores
app.use(errorHandler);


const httpServer = app.listen(config.port, (req,res) => {   
   logger.debug(`Server runing at port ${config.port}`);
});

socket.connect(httpServer);