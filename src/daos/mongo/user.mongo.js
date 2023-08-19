import { userModel } from "./model/user.js";
//import {  fechaHoraArgentina } from "../utils.js";
import moment from "moment-timezone";

class User {
  constructor() {}
  
   //////////////////////////////////////////////////////////////////////////  
   async getUsers(query,limit,page,sort){
    try {       
      
   let  users = await userModel.paginate(query, {limit:limit,page:page,lean:true,sort:sort});   
  
      return users;
    } catch (error) {
        throw new Error('Error retrieving product from the database.');
    }
  };


///////////////////////////////////////////////////////
  getUsersById = async (uid) => {
    const user = await userModel.findById({ _id: uid}).lean();  
    
    return user;
  };

  ///////////////////////////////////////////////////////
  getUsersByCartId = async (cid) => {       
    const user = await userModel.findOne({ cart: cid}).lean();  
    return user;
  };

  
  ///////////////////////////////////////////////////////
  getUserRole = async (role) => {  
    const user = await userModel.findById({ role: role}).lean();     
    return user;
  };
////////////////////////////////////////////////////////
  createUser = async (user) => {
    const createdUser = await userModel.create(user);
    return createdUser;
  };


/////////////////////////////////////////////////////////////////////////////////////
async updateUser(uid,usernuevo){
    try {
      const createdProduct = await userModel.updateOne({ _id: uid }, usernuevo);
      return createdProduct;
    } catch (error) {
      console.log(error);
    }
  };
  /////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
async deleteUser(uid){
  try {
     
      let result = await  userModel.deleteOne({ _id: uid});
    return result;
  } catch (error) {getProductsById
    console.log(error);
  }
  };
/////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////
 getUsuariosInactivos = async () => {
    try {
    
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() - 1); 
        
       const result = await userModel.find({last_connection: { $lte: fechaLimite}});  
        
        return result;

  } catch (error) {
    console.log(error);
  }
  };

/////////////////////////////////////////////////////////

}
export const userMongo = new User();