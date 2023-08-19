import chai from "chai";
import supertest from "supertest";
import mongoose from "mongoose";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("***** Set de pruebas de integración para modulo de sessions con supertest *****", function () {

    describe("Set de pruebas para flujo de sesión", function () { 

        it("POST /api/sessions/register: Debe registrar un usuario correctamente, sin repetir email", async function () {
            const mockUser = {
              first_name: "hector usuario",
              last_name: "Mokito",
              email: "hector@correo.com",
              age: "22",
              role: "user",
              password: "123",
            };
      
            const  result  = await requester.post("/api/sessions/register").send(mockUser);
      
            expect(result.status).to.be.eql(200);  
            expect(result._body.status).to.be.eql('sucess');
      
          });



          it("POST /api/sessions/login: Debe loguear correctamente al usuario y devolver  el usuario logueado", async function () {
            const mockUser = {
              email: "adminCoder@coder.com",
              password: "12qwaszx",
            };
      
            const result = await requester.post("/api/sessions/login").send(mockUser);
            expect(result._body.payload.email).to.be.eql(mockUser.email);  
            expect(result._body.payload).to.have.property("_id");         
          });

     
          it("GET /api/sessions/current: Debe mostrar la información contenida dentro user", async function () {
            const result = await requester.get("/api/sessions/current");            
            expect(result.status).to.be.eql(200);           
       
          });    



    });

    

});