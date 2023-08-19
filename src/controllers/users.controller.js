import  UsersService  from "../services/users.service.js";
import __dirname from "../utils.js";
import UserDTO from "../daos/dtos/user.dto.js";

const usersService = new UsersService();
////////////////////////////////////////////////////////////////////////////

export  async function getUsers(req, res) {
  try {
    console.log("getuserdto user.controller");
     req.logger.debug("entro a get user controllers"); 
 
      const limit = parseInt(req.query.limit) || 10;  
        const page = parseInt(req.query.page) || 1;    
        let  role = req.query.role;
      
      let sort =  req.query.sort;
      if (sort==1)
          sort ={ pPrice :-1};
      else
          sort ={ pPrice :-1};
    
      let query ={
              role: role || { $exists: true },
      };     
      const products =  await usersService.getUsers(query,limit,page,sort); 
    
        return res.send({ status: "success", payload: products });
    } catch (error) {
     // req.logger.debug(error.message); 
      console.log(error);
    }
 
};
////////////////////////////////////////////////////////////////////////////////////////////////
/** Ejercicio usando req.params
  * Este endpoint nos permite retornar un producto con un id especifico
 */
export async function getUsersById(req, res) {
    try {
       
       const uid = req.params.uid;  

       const users =  await usersService.getUserById(uid);
       if (!users) {
              return res.status(400).send({ status: "error", error: "No se encontro el usuario" });
         }else{
           return res.send({ status: "success", payload: users });
         }
  
        } catch (error) {
         // req.logger.debug(error.message); 
            console.log(error);
        }
     
   };
/////////////////////////////////////////////////////////////////////
export async function getUsersDto(req, res) {
  try {     
    
     console.log("getuserdto userconroller");
     const limit = parseInt(req.query.limit) || 10;  
        const page = parseInt(req.query.page) || 1;    
        let  role = req.query.role;
      
      let sort =  req.query.sort;
      if (sort==1)
          sort ={ pPrice :-1};
      else
          sort ={ pPrice :-1};
    
      let query ={
              role: role || { $exists: true },
      };
    const users =  await usersService.getUsersDto(query,limit,page,sort);    

     if (!users) {
            return res.status(400).send({ status: "error", error: "No se encontraron users" });
       }else{         
         return res.send({ status: "success", payload: users });
       }

      } catch (error) {      
          console.log(error);
      }
   
 };


 
/////////////////////////////////////////////////////////////////////

export async function switchRol(req, res) {
  
    try {
       console.log("entro switchRol a cambiar el rol en users.controllers " , req.error); 
       const uid = req.params.uid;   
        const usertoupdate =  await usersService.getUserById(uid);
        
        if (!usertoupdate) {
          return res
          .status(400)
          .send({ status: "error", error: "Incomplete values is product" });
        }

        const listadoc = usertoupdate.documents;       
        let contador = 0;
        if (listadoc){
         // console.log("entro a cargar listadoc");        
         ///verifico que tenga cargados los documentos para pasar a premiun el usuario
          listadoc.forEach( files =>{
          
              if (files.name.includes("identificacion")) {
                   contador=contador + 1;
                 
              }

              if (files.name.includes("comprobante de domicilio")) {
                contador=contador + 1;
             
              }

              if (files.name.includes("comprobante de estado de cuenta")) {
                contador=contador + 1;
              
              }
               
            });   
         } 
    
      //encuentra al primero que cumple la condicion id
      if (usertoupdate.role==='user' && contador===3){
          //  console.log("entro a cambiar 1");
            usertoupdate.role='premium';
         }
      else{
        if (usertoupdate.role!='premium'){
              return res
            .status(400)
            .send({ status: "error", error: "El usuario no termino de cargar los documentos" });
        }
      }

      if (usertoupdate.role==='premium'  && contador!=3){
       
            usertoupdate.role='user';
      }
      
      
          

      const result = await usersService.updateUser(uid,usertoupdate);
      return res.send({ status: "success", payload: result });
    } catch (error) {
    // req.logger.debug(error.message); 
      console.log(error);
    }
  };

  

  /////////////////////////////////////////////////////////////////////

export async function documents(req, res) {
   
  try {
     const uid = req.params.uid;         
      const usertoupdate =  await usersService.getUserById(uid);
    if (!usertoupdate) {
      return res
      .status(400)
      .send({ status: "error", error: "Incomplete values is product" });
    }
  const files = req.files;

  let documents=[];
  if (files.document){
  //  console.log("entroa cargar documents");
      files.document.forEach( files =>{
        const name=`${files.originalname}`
        const reference=`http://localhost:8080/images/documents/${files.originalname}`
       let elem ={
            name,
            reference
       };
        documents.push(elem);
      });   
   } 
   usertoupdate.documents=documents;
  

  const updateUser =  await usersService.updateUser(uid,usertoupdate);
  if (!updateUser) {
    return res
      .status(400)
      .send({ status: "error", error: "No se pudo actualizar usuario" });
  }
  return res.send({ status: "success", payload: updateUser });
  } catch (error) {
  // req.logger.debug(error.message); 
    console.log(error);
  }
};



/////////////////////////////////////////////////////////////////////
export async function profile(req, res) {
   
  try {
     const uid = req.params.uid;      
      const usertoupdate =  await usersService.getUserById(uid);
    if (!usertoupdate) {
      return res
      .status(400)
      .send({ status: "error", error: "Incomplete values is product" });
    }
    

  const files = req.files; 
  const auxprofile=files.profile[0];

 console.log("xx ccc" , auxprofile);

  let documents=[];
  if (files.profile){

      files.profile.forEach( files =>{
        const name=`${files.originalname}`
        const reference=`http://localhost:8080/images/profiles/${files.filename}`
       let elem ={
            name,
            reference
       };
        documents.push(elem);
      });   
   } 
   usertoupdate.profile=documents[0];
  ///console.log("profile xxxx " , usertoupdate );

  const updateUser =  await usersService.updateUser(uid,usertoupdate);
  if (!updateUser) {
    return res
      .status(400)
      .send({ status: "error", error: "No se pudo actualizar usuario" });
  }
  return res.send({ status: "success", payload: updateUser });
  } catch (error) {
  // req.logger.debug(error.message); 
    console.log(error);
  }
};
/////////////////////////////////////////////////////////////////////
export async function borrarUsuariosInactivos(req, res) {
  try {     
    const users =  await usersService.borrarUsuariosInactivos();    
     if (!users) {
            return res.status(400).send({ status: "error", error: "No se encontraron users" });
       }else{         
         return res.send({ status: "success", payload: users });
       }

      } catch (error) {      
          console.log(error);
      }
   
 };

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
export async function deleteUser(req, res) {
  try {     

    const { uid } = req.params;

    const user =  await usersService.deleteUser(uid);    

     if (!user) {
            return res.status(400).send({ status: "error", error: "No se encontraron user" });
       }else{         
         return res.send({ status: "success", payload: user });
       }

      } catch (error) {      
          console.log(error);
      }
   
 };