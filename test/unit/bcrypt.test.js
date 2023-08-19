import chai from "chai";
import { createHash, isValidPassword } from "../../src/utils.js";

const expect = chai.expect;

describe("Set de pruebas unitarias bcrypt con chai", function () {
  let mockUser = {
    first_name: "hector",
    last_name: "mella",
    email: "hectorjavier@correo.com",
    password: "12qwaszx",
  }; 

  it("bcrypt debe poder hacer un hasheo efectivo de la contraseña", async function () {
    let mockUser = {
      first_name: "Coder",
      last_name: "House",
      email: "prueba@correo.com",
      password: "123",
    };

    const result = await createHash(mockUser.password);
    expect(result).to.match(
      /(?=[A-Za-z0-9@#$%/^.,{}&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/g
    );
  });

  it("una contraseña hasheada debe poder compararse con la contraseña original", async function () { 
    const hashedPassword = await createHash(mockUser.password);
    mockUser.password = hashedPassword;
    const isValidPasswordd = await isValidPassword(mockUser, "12qwaszx");
    expect(isValidPasswordd).to.be.true;
  });

  it("sí la contraseña hasheada es alterada, la comparación debe fallar", async function () {
    

    const hashedPassword = await createHash(mockUser.password);
    mockUser.password = hashedPassword + 10;

    const isValidPasswordd = await isValidPassword(mockUser, "12qwaszx");
    expect(isValidPasswordd).to.be.false;
  });
});
