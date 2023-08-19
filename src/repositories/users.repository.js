
  
export default class UsersRepository {
    constructor(dao) {
      this.dao = dao;
    }
  //////////////////////////////////////////////////////////////////////////  
      async getUsers(query,limit,page,sort){
          try {
            let users=0;          
             users = await this.dao.getUsers(query,limit,page,sort);   
                             
            return users;
          } catch (error) {
              throw new Error('Error retrieving Users from the database.');
          }
        };
 //////////////////////////////////////////////////////////////////////////  
    /*    async getUsers(){
          try {
            let users=0;          
            users = await this.dao.getUsers();   
                             
            return users;
          } catch (error) {
              throw new Error('Error retrieving Users from the database.');
          }
        };
      */
  //////////////////////////////////////////////////////////////////////////  
  async getUsersById(uid){
      try {
 
     
        const users = await this.dao.getUsersById(uid);
        
        return users;
      } catch (error) {
        throw new Error('Error retrieving the users from the database.');
      }
    };

      //////////////////////////////////////////////////////////////////////////  
  async getUsersByCartId(cId){
    try {
   
      const users = await this.dao.getUsersByCartId(cId);
   
      return users;
    } catch (error) {
      throw new Error('Error retrieving the users from the database.');
    }
  };
      //////////////////////////////////////////////////////////////////////////  
  async getUserRole(role){
    try {
     
      const users = await this.dao.getUserRole(role);
      
      return users;
    } catch (error) {
      throw new Error('Error retrieving the users from the database.');
    }
  };

  
  /////////////////////////////////////////////////////////////////////////  
  async addUser(user){
      try {
        const createdUser = await this.dao.create(user);
        return createdUser;
      } catch (error) {
        console.log(error);
      }
    };
  
  
  /////////////////////////////////////////////////////////////////////////////////
  async deleteUser(uid){
      try {
          let result = await  this.dao.deleteUser({ _id: uid });         
        return result;
      } catch (error) {
        console.log(error);
      }
    };
  /////////////////////////////////////////////////////////////////////////////////////
  async updateUser(uid,usernuevo){
      try {
        const createdUser = await this.dao.updateUser( uid, usernuevo);
        return createdUser;
      } catch (error) {
        console.log(error);
      }
    };

  /////////////////////////////////////////////////////////////////////////////////
    async getUsuariosInactivos(){
      try {
        const result = await this.dao.getUsuariosInactivos();
        return result;
      } catch (error) {
        console.log(error);
      }
    };

  /////////////////////////////////////////////////////////////////////////////////
  


  
    }  
    
   