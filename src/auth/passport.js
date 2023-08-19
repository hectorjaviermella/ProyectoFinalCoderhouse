import passport from "passport";
import local from "passport-local";
import { cartModel } from "../daos/mongo/model/cart.js";
import { userModel } from "../daos/mongo/model/user.js";

import  UsersService  from "../services/users.service.js";


import { createHash, isValidPassword , fechaHoraArgentina } from "../utils.js";
import GitHubStrategy from "passport-github2";
import config from "../config/config.js";

import CustomError from "../services/errors/CustomError.js";
import ErrorCode from "../services/errors/enum.js";
import { addProductErrorInfo,CartErrorInfo,authenticationErrorInfo } from "../services/errors/info.js";



const usersService = new UsersService();
const { clientID, clientSecret, callbackUrl } = config;

const LocalStrategy = local.Strategy;

const initializePassport = () => {
 /////////////////////////////////////////////////////////////////////

  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          
          const { first_name, last_name, email, age,role } = req.body;
          
       
          let user = await userModel.findOne({ email: username }).lean();
          if (user) {
            console.log("ya existe un usuario con ese email");
            return done(null, false);
           
          }


          const cart = await cartModel.create({});

          const newUser = {
            first_name,
            last_name,
            email: username,
            age,
            password: createHash(password),
            role: role ?? "user",
            cart: cart._id,
          };

          let result = await userModel.create(newUser);

          return done(null, result); //devuelvo resultado
        } catch (error) {
          return done("Error when trying to find user:" + error);
        }
      }
    )
  );

  
//////////////////////////////////////////////////////////////////////////////////////////////////
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
      
        try {
          const user = await userModel.findOne({ email: username }).lean();
          if (!user) return done(null, false);

          if (!isValidPassword(user, password)) {
            const error = CustomError.createError({
              name: "Authentication error",
              cause: authenticationErrorInfo(),
              message: "Error authenticating password",
              code: ErrorCode.AUTHENTICATION_ERROR,
              status: 401,
            });
             console.log(error.message);
             return done(null, false); //contrasena incorrecta
             // return done(error.message,false);
            }
          delete user.password;
        //console.log("entro a poner los roles " , user );
        /*  if (user.email ==="adminCoder@coder.com")
               user.role="admin";
          else
               user.role="user";*/
      
               console.log("fecha y hora argentina xx " , fechaHoraArgentina );
               
               //user.last_connection= new Date();       
               user.last_connection= fechaHoraArgentina;       
            const result = await usersService.updateUser(user._id,user);
      
          return done(null, user);  //retorno el usuario
        } catch (error) {
          return done(error);
        }
      }
    )
  );

/////////////////////////////////////////////////////////////////////////////////////////////////
passport.use(
  "githublogin",
  new GitHubStrategy(
    {
      clientID,
      clientSecret,
      callbackUrl,
    },
    async (accessToken, refreshToken, profile, done) => {
      
      try {
    
        let user = await userModel.findOne({ email: profile._json.email });
        if (!user) {
          let newUser = {
            first_name: profile._json.name,
            last_name: "",
            age: 20,
            email: profile._json.email,
            password: "",
          };

          let result = await userModel.create(newUser);
          return done(null, result);
        }
      
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

///////////////////////////////////////////////////////////////////////////////////////////////
passport.serializeUser((user, done) => {
  done(null, user._id);
});
////////////////////////////////////////////////////////////////////////////////////////////////
passport.deserializeUser(async (id, done) => {
  let user = await userModel.findById(id);
  done(null, user);
});
};












export default initializePassport;