import chai from "chai";
import mongoose, { mongo } from "mongoose";

import config from "../../src/config/config.js";
import { userRepository } from "../../src/repositories/index.js";
import UserDTO from "../../src/daos/dtos/user.dto.js";


const expect = chai.expect;

describe("Set de pruebas del modulo de usuarios con Chai", () => {
  before(function () {
    mongoose.connect(config.dbUrl);
   // this.usersDao =  userRepository;
  });
/*
  beforeEach(function () {
    mongoose.connection.collections.users.drop();
  });
*/
  it("El Dao debe retornar los usuarios en un array", async function () {
    const result = await userRepository.getUsers();
    expect(result).to.be.a("array");
    
  });
});

describe("Set de pruebas para el UserDTO", function () {
  let mockUser = {
    first_name: "Coder",
    last_name: "House",
    email: "prueba@correo.com",
    rol: "admin",
    password: "123",
  };

 

  it("El UserDTO debe eliminar las propiedades innecesarias como password y rol", function () {
    const user = new UserDTO(mockUser);
      expect(user).to.not.have.property("password");
      expect(user).to.not.have.property("rol");
  });
  
});
