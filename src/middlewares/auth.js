import  UsersService  from "../services/users.service.js";
const usersService = new UsersService();
/*
  function checkLogin(req, res, next) {
    if (!req.session.user) return res.redirect("/login");
    next();
  }
*/
function checkLogin(req, res, next) {
 
 /* if (!req.session.user.email || !req.session.user.password) {
    const error = CustomError.createError({
      name: "Authentication error",
      cause: authenticationErrorInfo(),
      message: "Error authenticating user",
      code: ErrorCode.AUTHENTICATION_ERROR,
      status: 401,
    });
    
    return next(error);
  }*/
  if (!req.session.user) {
    return res.redirect("/login");

  }
  next();
}

  
  function checkLogged(req, res, next) {
    if (req.session.user) return res.redirect("/login");
    next();
  }
  
  function checkSession(req, res, next) {
    if (req.session.user) return res.redirect("/");
    next();
  }
///////////////////////////////////////////////////////////////////////
  function checkPermisosAdministrador(req, res, next) { 
    if (req.session.user.role==="user")    {    
      return res.render("erroraccess", { error:"No tienes los permisos para acceder a esta pagina"});
    }
else
    {   
      next();
     }
       
  }
///////////////////////////////////////////////////////////////
  function checkPermisosUsuario(req, res, next) {     
    if (req.session.user.role==="admin")         
         {          
          return res.status(401).send({ status: 'Error', error: "You cannot access to this place" });
        }
    else
        {   
          next();
         }
       
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
function checkVistaAdministrador(req, res, next) {  

  if ( req.session.user.role !== "admin") {
    return res.render("erroraccess", { error:"Solo puede acceder a esta vista el administrador"});
   
  } else {
    next();
  }
     }
///////////////////////////////////////////////////////////////
async function  checkDocCargados(req, res, next) {  
 //  console.log("entro al chekdoccargados vv " , req.session.user.role );
  const uid = req.params.uid;   
  const usertoupdate =  await usersService.getUserById(uid);

   if ( req.session.user.role === "admin") {   
     return res.render("erroraccess", { error:"es admin"});
    
   } else {
     next();
   }
      
 }
///////////////////////////////////////////////////////////////
  
  export { checkLogged, checkLogin, checkSession, checkPermisosAdministrador,checkPermisosUsuario, checkVistaAdministrador,checkDocCargados };