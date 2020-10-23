
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const server = require("../app");
const expect = chai.expect;

let token="";
let user={};

let loginUser = {
    email: "ali.gamal95880@gmail.com",
    password: "12345"
  };

  describe("first test", () => {
    it ("register user",(done)=>{  
        chai
            .request(server)
            .post("/api/users/userRegistration")
            .set("content-type", "application/json")
            .send({"fullName": "ali gamal","password": "12345","email": "ali.gamal95880@gmail.com","age": 15,"phoneNumber": "01017431767","address": "cairo maadi"})
            .then((response) => {
                expect(response).to.be.json;
                expect(response).to.have.status(200);
                expect(response.body).to.have.property("message");
                done();
            }).catch((error)=>{
                done(error);
            });
        }).timeout(50000);
    });
    

describe("second test", () => {
it ("login to get token",(done)=>{  
    chai
        .request(server)
        .post("/api/users/userLogin")
        .set("content-type", "application/json")
        .send(loginUser)
        .then((response) => {
            token= response.body.token;
            user= response.body.user;
            expect(response).to.be.json;
            expect(response).to.have.status(200);
            expect(response.body).to.have.property("message");
            expect(response.body).to.have.property("token");
            expect(response.body).to.have.property("user");
            done();
        }).catch((error)=>{
            done(error);
        });
    }).timeout(50000);
});


describe("third test", () => {
  it("get user devices", (done) => {
    chai
    .request(server)
    .get("/api/devices/getUserDevices")
    .set("content-type", "application/json")
    .set("token",token)
    .query({ userId: user._id })
    .then((response) => {
        expect(response).to.be.json;
        expect(response).to.have.status(200);
        expect(response.body).to.have.property("message");
        expect(response.body.data).to.be.an.instanceof(Array);
        expect(response.body.data[0]).to.have.all.key(["_id","deviceName","categoryName","color","barcode","price","quantity","weight","createdAt","updatedAt"]);
        done();
    }).catch((error)=>{
        done(error);
    });
   }).timeout(50000);
});



describe("fourth test", () => {
    it("get device data", (done) => {
      chai
      .request(server)
      .get("/api/devices/getDeviceData")
      .set("content-type", "application/json")
      .set("token",token)
      .query({ deviceId: "5f91d916ac85413b24b21126" })
      .then((response) => {
          expect(response).to.be.json;
          expect(response).to.have.status(200);
          expect(response.body).to.have.property("message");
          expect(response.body.data).to.have.all.key(["_id","deviceName","categoryName","color","barcode","price","quantity","weight","createdAt","updatedAt"]);
          done();
      }).catch((error)=>{
          done(error);
      });
     }).timeout(50000);
  });





