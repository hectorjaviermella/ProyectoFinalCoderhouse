import { Router } from "express";
import UserDTO from "../daos/dtos/user.dto.js";
import { createHash, isValidPassword, transport } from "../utils.js";

import { userModel } from "../daos/mongo/model/user.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";
import  UsersService  from "../services/users.service.js";
const usersService = new UsersService();

export const sessionsRouter = Router();
////////////////////////////////////////////////////////////////
export async function logout(req, res) {
 //console.log("req.session " , req.session.cookie._expires);
  if (req.session.cookie._expires){
    const cart =req.session.user.cart;
        const user = await usersService.getUsersByCartId({cart});
  
  
    user.last_connection= new Date();
    const result = await usersService.updateUser(user._id,user);
  };
    req.session.destroy( err => {
      if (!err) {
              return res.send("Logout exitoso");
              //return res.redirect("/login");
      }
      else
          res.send("Logout no exitoso");
    })

///else   res.send("Logout no exitoso");
    
};

////////////////////////////////////////////////////////////////////////////

export function register(req, res) {
    
    return res.send({ status: "sucess", message: "user registered" });
  }
;

//////////////////////////////////////////////////////////////////////////////////////////////////////
export function login(req, res) {

   
    if (!req.user)
      return res.status(401).send({ status: "error", error: "Unauthorized" });


    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      role: req.user.role,
      cart: req.user.cart,

    };
    
    res.send({ status: "sucess", payload: req.user });
  }
;

//////////////////////////////////////////////////////////////////////////////////////////////////////
/*export async function restore(req, res) {
  try {
    Console.log("entro al restore");
    const token = req.param;
    Console.log("entro al restore", token);

    //const { email, password } = req.body;
/*
    const user = await userModel.findOne({ email }).lean();
    if (!user) {
      return res
        .status(404)
        .send({ status: "error", error: "user does not exist" });
    }

    const hashedPassword = createHash(password);

    await userModel.updateOne({ email }, { password: hashedPassword });

    return res.send({
      status: "sucess",
      message: "succesfully updated password",
    });
    */
 /* } catch (error) {
    console.log(error);
  }
};

*/
///////////////////////////////////////////////////////////////////////////////////////////////////////
export function github(req, res) {
}
;
//////////////////////////////////////////////////////////////////////////////////////////////////////
export function githubcallback(req, res) {
    req.session.user = req.user;
   
    res.redirect("/products");
  }
;

////////////////////////////////////////////////////////////////////////////////////////////

export function current(req, res) {
  
  
  const userToSave = new UserDTO(req.session.user);
 
  res.render("profile", { user: userToSave ,status: "sucess", payload: userToSave  });
};


export default sessionsRouter;