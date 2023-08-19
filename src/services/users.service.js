
import { userRepository } from "../repositories/index.js";
import UserDTO from "../daos/dtos/user.dto.js";

import  MailsService  from "../services/mails.service.js";
const mailsService = new MailsService();

export default class UserService {
  constructor() {}

///////////////////////////////////////////////////////////
async getUsersDto(query,limit,page,sort) {
  try {
      
    var listresult = []; 
       const users = await userRepository.getUsers(query,limit,page,sort);
      
       if (!users) {
                 return res.status(400).send({ status: "error", error: "No se encontro el usuario" });
       }else    {   
                    for (let i = 0; i < users.docs.length; i++) {
                    let usersDTO = new UserDTO(users.docs[i]);
                    listresult.push(usersDTO);
                     }                   
                      return listresult;
                   }

  } catch (error) {
    // req.logger.debug(error.message); 
       console.log(error);
   }
  }

////////////////////////////////////////////////////////////////////////
async getUsers(query,limit,page,sort) {
  try {
       const users = await userRepository.getUsers(query,limit,page,sort);
   
       if (!users) {
                 return res.status(400).send({ status: "error", error: "No se encontro el usuario" });
                  }else    {                                
                      return users;
                   } 

  } catch (error) {    
       console.log(error);
   }
  }
////////////////////////////////////////////////////////////////////////
async getUserById(id) {
  try {
    
    const user = await userRepository.getUsersById(id);
    return user;
  } catch (error) {
    console.log();
    return null;
  }
};

////////////////////////////////////////////////////////////////////////
async getUsersByCartId(id) {
  try {
    
    const user = await userRepository.getUsersByCartId(id);
    return user;
  } catch (error) {
    console.log();
    return null;
  }
};
////////////////////////////////////////////////////////////////////////
async getUserRole(role) {
  try {
    
    const user = await userRepository.getUserRole(role);
    return user;
  } catch (error) {
    console.log();
    return null;
  }
};
////////////////////////////////////////////////////////////////////////

create(user) {
    const result = userRepository.addUser(user);
    return result;
  }
////////////////////////////////////////////////////////////////////////

updateUser(uid,user) {
    const createdUser = userRepository.updateUser(uid,user);
    return createdUser;
  }


////////////////////////////////////////////////////////////////////////

async borrarUsuariosInactivos() {
  try {
    
    //recupero usuarios inactivos
    const result = await userRepository.getUsuariosInactivos();

    //recorro lista de usuarios inactivos los elimino y le envio email para avisarles.    
    if (result){
    result.forEach( usuario =>{
       // console.log("user" , usuario.email);
        const deleteuser =     userRepository.deleteUser(usuario.id);
      //  console.log("borro " , usuario.email);
        if (deleteuser){
            let psubject = `Se elimino su usuario por Inactividad   ${usuario.first_name} `;     
            let phtml = `Se elimino su usuario con  correo  ${usuario.email}`
              mailsService.sendEmail(usuario.email,psubject , phtml);
        }
      });  
    }else result=null;
      
    return result;
} catch (error) {
      console.log();
       return null;
}
}
/////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

deleteUser(uid) {
  try {
        const result = userRepository.deleteUser(uid);
    return result;
  } catch (error) {
    console.log();
     return null;
}
  };
///////////////////////////////////////////////////////////////////////
}


