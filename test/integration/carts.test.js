import chai from "chai";
import supertest from "supertest";
import mongoose from "mongoose";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("****** Set de pruebas de integración para modulo de carts usando supertest *****", function () {


    describe("Set de pruebas para POST /api/carts/ donde se crea un carrito con array de productos vacios", function () {   
        it("POST /api/carts/ Debe crear un carrito correctamente", async function () {
          const result = await requester.post("/api/carts"); 
          expect(result._body.status).to.be.eql('success');        
         expect(result._body.payload).to.have.property("_id");       
         expect(result._body.payload.products).to.be.eql([]);  
        
        });
      
      });


    describe("Set de pruebas para GET /api/carts/:cId", function () {

        it("GET /api/carts/:cId Debe recuperar un carrito de la base de datos correctamente, con un array de productos", async function () {
          const result = await requester.get("/api/carts/649da54f35f1c25c22510336");
          expect(result._body.payload).to.have.property("_id");
          expect(result._body.payload._id).to.be.eql("649da54f35f1c25c22510336");     
          expect(result.status).to.be.eql(200);      
          expect(result._body.payload).to.have.property('products').to.be.an('array');      
       
        });         
      });



      describe("Set de pruebas para DELETE /api/carts/:cId", function () {
        it("DELETE /api/carts/:cId Debe eliminar un carrito de la base de datos correctamente", async function () {
            const result = await requester.delete("/api/carts/64b1d1186be7afb324a1606a");
            expect(result.status).to.be.eql(200);                
            expect(result.body).to.be.an('object');
            expect(result._body.status).to.be.eql('success');
                  
        });

    });

    




});