import chai from "chai";
import supertest from "supertest";
import mongoose from "mongoose";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("***** Set de pruebas de integración para modulo de productos usando supertest *****", function () {
/*
      beforeEach(function () {
        mongoose.connection.collections.products.drop();
      });
      */
    describe("Set de pruebas para POST /api/products", function () {

      const productMock = {
        pTitle:"bebida mock",
        pDescription:"bebida mock ",
        pOwner:"hectorjaviermella@gmail.com",
        pCode: "ipadk500",
        pPrice:"100",
        pStatus:true,
        pStock:"110",
        pCategory:"bebidas",
        pThumbnail:[],
      };


      it("POST /api/products: Debe crear un producto correctamente con la ruta de una imagen", async function () {
        const result = await requester
          .post("/api/products")
          .field("pTitle", productMock.pTitle)
          .field("pDescription", productMock.pDescription)
          .field("pOwner", productMock.pOwner)
          .field("pCode", productMock.pCode)
          .field("pPrice", productMock.pPrice)
          .field("pStatus", productMock.pStatus)
          .field("pStock", productMock.pStock)
          .field("pCategory", productMock.pCategory)
          .attach("pThumbnail", "./test/integration/assents/uvita.jpg");
  

       
        expect(result.status).to.be.eql(200);
        expect(result._body.payload).to.have.property("_id");
        expect(result._body.payload.pThumbnail[0]).to.be.ok;

        
        
      });
  

    });


   describe("Set de pruebas para GET /api/products/:pId", function () {

      it("GET /api/products/:pId Debe recuperar un producto de la base de datos correctamente", async function () {
        const result = await requester.get("/api/products/649d84685c3d190a7b9b0ea9");
        expect(result._body.payload).to.have.property("_id");
        expect(result._body.payload._id).to.be.eql("649d84685c3d190a7b9b0ea9");     
        expect(result.status).to.be.eql(200);     
      });

       
    });

    
    describe("Set de pruebas para DELETE /api/products/:pId", function () {
        it("DELETE /api/products/:pId Debe eliminar un producto de la base de datos correctamente", async function () {
            const result = await requester.delete("/api/products/64b1c81f039733a3e32a9c8d");
            expect(result.status).to.be.eql(200);                
            expect(result.body).to.be.an('object');
            expect(result.body.status).to.be.eql('Success');      
        });
    });

      
    describe("Set de pruebas para DELETE /api/products/:pId", function () {
      it("DELETE /api/products/:pId Si el producto a eliminar no existe", async function () {
          const result = await requester.delete("/api/products/64b1c81f039733a3e32a9c8d");
        
          expect(result.statusCode).to.equal(404);
          expect(result._body).to.have.property('error');
          expect(result._body.error).to.equal('Could not delete product. No exist product');
      
      

      
      });

  });





  
   
   
  });